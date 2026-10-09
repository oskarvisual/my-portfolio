import fs from 'fs';
import path from 'path';
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
  console.error('❌ Error: Missing DO_SPACES_KEY, DO_SPACES_SECRET, or DO_SPACES_BUCKET in .env');
  process.exit(1);
}

const cleanDestDir = DO_SPACES_DEST_DIR.replace(/^\/+|\/+$/g, '');
const endpoint = `https://${DO_SPACES_REGION}.digitaloceanspaces.com`;
const cdnBase = `https://${DO_SPACES_BUCKET}.${DO_SPACES_REGION}.cdn.digitaloceanspaces.com/${cleanDestDir}`;

console.log('🚀 DigitalOcean Spaces Sync & Setup');
console.log('  • Bucket:      ', DO_SPACES_BUCKET);
console.log('  • Region:      ', DO_SPACES_REGION);
console.log('  • Destination: ', cleanDestDir);
console.log('  • Endpoint:    ', endpoint);
console.log('  • CDN URL:     ', cdnBase);
console.log('----------------------------------------------------');

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

async function uploadVideos() {
  const localDir = path.resolve('src/assets/videos');
  if (!fs.existsSync(localDir)) {
    console.error(`❌ Local directory not found: ${localDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(localDir).filter((f) => f.endsWith('.mp4'));
  console.log(`📁 Found ${files.length} video files to process in src/assets/videos/\n`);

  for (const file of files) {
    const filePath = path.join(localDir, file);
    const stats = fs.statSync(filePath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    const key = `${cleanDestDir}/${file}`;

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
        console.log(`⏭️  Skipping ${file} (${fileSizeMB} MB) — already up to date on Spaces`);
        shouldUpload = false;
      }
    } catch (e) {
      // Object doesn't exist, proceed with upload
      shouldUpload = true;
    }

    if (shouldUpload) {
      console.log(`⬆️  Uploading ${file} (${fileSizeMB} MB)...`);
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

  console.log('\n----------------------------------------------------');
  console.log('🎉 All videos synced to DigitalOcean Spaces!');
  console.log('📡 Public CDN base:');
  console.log(`   ${cdnBase}`);
}

async function main() {
  await configureCors();
  await uploadVideos();
}

main().catch((err) => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
