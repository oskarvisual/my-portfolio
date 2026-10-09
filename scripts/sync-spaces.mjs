import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {
  S3Client,
  PutBucketCorsCommand,
  PutObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';

// Load .env variables manually
if (fs.existsSync('.env')) {
  const content = fs.readFileSync('.env', 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const {
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_BUCKET,
  DO_SPACES_REGION = 'sfo3',
  DO_SPACES_DEST_DIR = 'my-portfolio/videos',
} = process.env;

if (!DO_SPACES_KEY || !DO_SPACES_SECRET || !DO_SPACES_BUCKET) {
  console.warn('⚠️ Notice: DO_SPACES credentials not detected in environment.');
  console.warn('⚠️ Skipping DigitalOcean Spaces sync and continuing with build...');
  process.exit(0);
}

const cleanDestDir = DO_SPACES_DEST_DIR.replace(/^\/+|\/+$/g, '');
const projectRoot = cleanDestDir.replace(/\/?(videos|images).*$/, '') || 'my-portfolio';
const videosDestDir = `${projectRoot}/videos`;
const imagesDestDir = `${projectRoot}/images`;
const docsDestDir = `${projectRoot}/docs`;

const endpoint = `https://${DO_SPACES_REGION}.digitaloceanspaces.com`;
const cdnBase = `https://${DO_SPACES_BUCKET}.${DO_SPACES_REGION}.cdn.digitaloceanspaces.com/${projectRoot}`;

console.log('🚀 DigitalOcean Spaces Media Sync & Setup');
console.log('  • Bucket:        ', DO_SPACES_BUCKET);
console.log('  • Region:        ', DO_SPACES_REGION);
console.log('  • Project Root:  ', projectRoot);
console.log('  • Videos Dest:   ', videosDestDir);
console.log('  • Images Dest:   ', imagesDestDir);
console.log('  • Endpoint:      ', endpoint);
console.log('  • CDN URL:       ', cdnBase);
console.log('----------------------------------------------------');

if (process.env.GITHUB_ENV) {
  try {
    fs.appendFileSync(process.env.GITHUB_ENV, `VITE_SPACES_CDN_BASE_URL=${cdnBase}\n`);
    console.log(`📡 Exported VITE_SPACES_CDN_BASE_URL to GITHUB_ENV: ${cdnBase}`);
  } catch (e) {
    console.warn('⚠️ Could not append to GITHUB_ENV:', e.message);
  }
}

const s3 = new S3Client({
  endpoint,
  region: DO_SPACES_REGION,
  credentials: {
    accessKeyId: DO_SPACES_KEY,
    secretAccessKey: DO_SPACES_SECRET,
  },
  forcePathStyle: false,
});

async function configureCors() {
  console.log('⚙️  Configuring CORS on bucket via API...');
  try {
    const corsParams = {
      Bucket: DO_SPACES_BUCKET,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedOrigins: ['*'],
            AllowedMethods: ['GET', 'HEAD'],
            AllowedHeaders: ['*'],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    };
    await s3.send(new PutBucketCorsCommand(corsParams));
    console.log('✅ CORS configuration successfully applied via API!');
  } catch (err) {
    console.warn('⚠️ Note on CORS configuration:', err.message || err);
  }
}

async function optimizeImages() {
  const imagesDir = path.resolve('src/assets/images');
  if (!fs.existsSync(imagesDir)) return;

  console.log('\n🎨 Optimizing images to high-performance WebP format...');

  // 1. floor.jpg (Seamless background pattern) -> floor.webp
  const floorJpg = path.join(imagesDir, 'floor.jpg');
  const floorWebp = path.join(imagesDir, 'floor.webp');
  if (fs.existsSync(floorJpg) && (!fs.existsSync(floorWebp) || fs.statSync(floorJpg).mtimeMs > fs.statSync(floorWebp).mtimeMs)) {
    console.log('   Converting floor.jpg to 1600x1600 WebP (q78)...');
    await sharp(floorJpg)
      .resize(1600, 1600, { fit: 'inside' })
      .webp({ quality: 78, effort: 6 })
      .toFile(floorWebp);
    const oldSz = (fs.statSync(floorJpg).size / 1024).toFixed(1);
    const newSz = (fs.statSync(floorWebp).size / 1024).toFixed(1);
    console.log(`   ✅ floor.webp generated: ${oldSz} KB -> ${newSz} KB`);
  }

  // 2. cart.png (Shopping cart with alpha) -> cart.webp
  const cartPng = path.join(imagesDir, 'cart.png');
  const cartWebp = path.join(imagesDir, 'cart.webp');
  if (fs.existsSync(cartPng) && (!fs.existsSync(cartWebp) || fs.statSync(cartPng).mtimeMs > fs.statSync(cartWebp).mtimeMs)) {
    console.log('   Converting cart.png to transparent WebP (q85, effort 6)...');
    await sharp(cartPng)
      .webp({ quality: 85, effort: 6 })
      .toFile(cartWebp);
    const oldSz = (fs.statSync(cartPng).size / 1024).toFixed(1);
    const newSz = (fs.statSync(cartWebp).size / 1024).toFixed(1);
    console.log(`   ✅ cart.webp generated: ${oldSz} KB -> ${newSz} KB`);
  }

  // 3. open-to-work.jpg -> open-to-work.webp
  const otwJpg = path.join(imagesDir, 'open-to-work.jpg');
  const otwWebp = path.join(imagesDir, 'open-to-work.webp');
  if (fs.existsSync(otwJpg) && (!fs.existsSync(otwWebp) || fs.statSync(otwJpg).mtimeMs > fs.statSync(otwWebp).mtimeMs)) {
    console.log('   Converting open-to-work.jpg to WebP...');
    await sharp(otwJpg)
      .webp({ quality: 85 })
      .toFile(otwWebp);
    console.log('   ✅ open-to-work.webp generated');
  }

  // 4. my-presentation.png -> my-presentation.webp
  const presPng = path.join(imagesDir, 'my-presentation.png');
  const presWebp = path.join(imagesDir, 'my-presentation.webp');
  if (fs.existsSync(presPng) && (!fs.existsSync(presWebp) || fs.statSync(presPng).mtimeMs > fs.statSync(presWebp).mtimeMs)) {
    console.log('   Converting my-presentation.png to WebP (q85, effort 6)...');
    await sharp(presPng)
      .webp({ quality: 85, effort: 6 })
      .toFile(presWebp);
    const oldSz = (fs.statSync(presPng).size / 1024).toFixed(1);
    const newSz = (fs.statSync(presWebp).size / 1024).toFixed(1);
    console.log(`   ✅ my-presentation.webp generated: ${oldSz} KB -> ${newSz} KB`);
  }
}

async function uploadImages() {
  const imagesDir = path.resolve('src/assets/images');
  if (!fs.existsSync(imagesDir)) return;

  const files = fs.readdirSync(imagesDir).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ['.webp', '.jpg', '.jpeg', '.png', '.svg'].includes(ext) && !f.includes('original');
  });

  console.log(`\n📁 Found ${files.length} image files to sync in src/assets/images/`);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    const fileSizeKB = (stats.size / 1024).toFixed(1);
    const key = `${imagesDestDir}/${file}`;

    let shouldUpload = true;
    try {
      const head = await s3.send(
        new HeadObjectCommand({
          Bucket: DO_SPACES_BUCKET,
          Key: key,
        })
      );
      if (head.ContentLength === stats.size) {
        console.log(`⏭️  Skipping image ${file} (${fileSizeKB} KB) — already up to date on Spaces`);
        shouldUpload = false;
      }
    } catch {
      shouldUpload = true;
    }

    if (shouldUpload) {
      console.log(`⬆️  Uploading image ${file} (${fileSizeKB} KB)...`);
      const fileBuffer = fs.readFileSync(filePath);
      const ext = path.extname(file).toLowerCase();
      let contentType = 'application/octet-stream';
      if (ext === '.webp') contentType = 'image/webp';
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.png') contentType = 'image/png';
      else if (ext === '.svg') contentType = 'image/svg+xml';

      await s3.send(
        new PutObjectCommand({
          Bucket: DO_SPACES_BUCKET,
          Key: key,
          Body: fileBuffer,
          ACL: 'public-read',
          ContentType: contentType,
          CacheControl: 'public, max-age=31536000, immutable',
        })
      );
      console.log(`   ✅ Uploaded: ${key} (Cache: 1 year, ACL: public-read)`);
    }
  }
}

async function uploadVideos() {
  const localDir = path.resolve('src/assets/videos');
  if (!fs.existsSync(localDir)) {
    console.error(`❌ Local directory not found: ${localDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(localDir).filter((f) => f.endsWith('.mp4'));
  console.log(`\n📁 Found ${files.length} video files to process in src/assets/videos/`);

  for (const file of files) {
    const filePath = path.join(localDir, file);
    const stats = fs.statSync(filePath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    const key = `${videosDestDir}/${file}`;

    // Check if file already exists with same size
    let shouldUpload = true;
    try {
      const head = await s3.send(
        new HeadObjectCommand({
          Bucket: DO_SPACES_BUCKET,
          Key: key,
        })
      );
      if (head.ContentLength === stats.size) {
        console.log(`⏭️  Skipping video ${file} (${fileSizeMB} MB) — already up to date on Spaces`);
        shouldUpload = false;
      }
    } catch {
      shouldUpload = true;
    }

    if (shouldUpload) {
      console.log(`⬆️  Uploading video ${file} (${fileSizeMB} MB)...`);
      const fileBuffer = fs.readFileSync(filePath);

      await s3.send(
        new PutObjectCommand({
          Bucket: DO_SPACES_BUCKET,
          Key: key,
          Body: fileBuffer,
          ACL: 'public-read',
          ContentType: 'video/mp4',
          CacheControl: 'public, max-age=31536000, immutable',
        })
      );
      console.log(`   ✅ Uploaded: ${key} (Cache: 1 year, ACL: public-read)`);
    }
  }
}

async function uploadDocs() {
  const docsDir = path.resolve('src/assets/docs');
  if (!fs.existsSync(docsDir)) return;

  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.pdf'));
  console.log(`\n📁 Found ${files.length} document files to sync in src/assets/docs/`);

  for (const file of files) {
    const filePath = path.join(docsDir, file);
    const stats = fs.statSync(filePath);
    const fileSizeKB = (stats.size / 1024).toFixed(1);
    const key = `${docsDestDir}/${file}`;

    let shouldUpload = true;
    try {
      const head = await s3.send(
        new HeadObjectCommand({
          Bucket: DO_SPACES_BUCKET,
          Key: key,
        })
      );
      if (head.ContentLength === stats.size) {
        console.log(`⏭️  Skipping doc ${file} (${fileSizeKB} KB) — already up to date on Spaces`);
        shouldUpload = false;
      }
    } catch {
      shouldUpload = true;
    }

    if (shouldUpload) {
      console.log(`⬆️  Uploading doc ${file} (${fileSizeKB} KB)...`);
      const fileBuffer = fs.readFileSync(filePath);

      await s3.send(
        new PutObjectCommand({
          Bucket: DO_SPACES_BUCKET,
          Key: key,
          Body: fileBuffer,
          ACL: 'public-read',
          ContentType: 'application/pdf',
          CacheControl: 'public, max-age=31536000, immutable',
        })
      );
      console.log(`   ✅ Uploaded: ${key} (Cache: 1 year, ACL: public-read)`);
    }
  }
}

async function main() {
  await configureCors();
  await optimizeImages();
  await uploadImages();
  await uploadVideos();
  await uploadDocs();

  console.log('\n----------------------------------------------------');
  console.log('🎉 All media (images, svgs, docs & videos) synced to DigitalOcean Spaces!');
  console.log('📡 Public CDN base:');
  console.log(`   ${cdnBase}`);
}

main().catch((err) => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
