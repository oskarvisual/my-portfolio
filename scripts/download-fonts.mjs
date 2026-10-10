import fs from 'fs';
import path from 'path';
import https from 'https';

const FONT_URL = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500;1,6..72,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const fontsDir = path.resolve('src/assets/fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

function fetch(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location, headers).then(resolve, reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  console.log('📡 Fetching Google Fonts stylesheet...');
  const cssBuffer = await fetch(FONT_URL, { 'User-Agent': USER_AGENT });
  const cssText = cssBuffer.toString('utf8');

  // Split into @font-face blocks
  const parts = cssText.split('/* ');
  const generatedRules = [];

  for (const part of parts) {
    if (!part.startsWith('latin */') && !part.startsWith('latin-ext */')) {
      continue;
    }
    const isLatinExt = part.startsWith('latin-ext */');
    const block = '/* ' + part;

    const familyMatch = block.match(/font-family:\s*['"]?([^'";]+)['"]?;/);
    const styleMatch = block.match(/font-style:\s*([^;]+);/);
    const weightMatch = block.match(/font-weight:\s*([^;]+);/);
    const urlMatch = block.match(/url\(([^)]+)\)/);
    const unicodeMatch = block.match(/unicode-range:\s*([^;]+);/);

    if (!familyMatch || !styleMatch || !weightMatch || !urlMatch) continue;

    const family = familyMatch[1].trim();
    const style = styleMatch[1].trim();
    const weight = weightMatch[1].trim();
    const fontUrl = urlMatch[1].trim();
    const unicodeRange = unicodeMatch ? unicodeMatch[1].trim() : '';

    const safeFamily = family.toLowerCase().replace(/\s+/g, '-');
    const safeStyle = style === 'italic' ? 'italic' : 'normal';
    const subset = isLatinExt ? 'latinext' : 'latin';
    const fileName = `${safeFamily}-${safeStyle}-${weight}-${subset}.woff2`;
    const filePath = path.join(fontsDir, fileName);

    console.log(`⬇️ Downloading ${fileName}...`);
    const fontBuffer = await fetch(fontUrl);
    fs.writeFileSync(filePath, fontBuffer);
    console.log(`   ✅ Saved (${(fontBuffer.length / 1024).toFixed(1)} KB)`);

    generatedRules.push(`/* ${family} ${style} ${weight} (${isLatinExt ? 'latin-ext' : 'latin'}) */
@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url('./assets/fonts/${fileName}') format('woff2');
  unicode-range: ${unicodeRange};
}`);
  }

  const outputCssPath = path.resolve('src/fonts.css');
  fs.writeFileSync(outputCssPath, generatedRules.join('\n\n') + '\n');
  console.log(`\n🎉 Generated src/fonts.css with ${generatedRules.length} font definitions!`);
}

run().catch(err => {
  console.error('❌ Error downloading fonts:', err);
  process.exit(1);
});
