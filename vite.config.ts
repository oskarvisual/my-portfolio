import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

const CRITICAL_FONT_PREFIXES = [
  'plus-jakarta-sans-normal-400-latin-',
  'plus-jakarta-sans-normal-800-latin-',
  'newsreader-italic-400-latin-',
];

export default defineConfig(({ command, mode }) => {
  // During local development (npm run dev), always serve from root
  if (command === 'serve') {
    return {
      plugins: [react()],
      base: '/',
    };
  }

  // Keep every hashed build artifact on Spaces. The deploy workflow uploads
  // dist/assets with an immutable one-year cache, so the HTML can safely point
  // at the CDN while source updates receive new content hashes.
  const env = loadEnv(mode, process.cwd(), '');
  const rawCdn = (env.VITE_SPACES_CDN_BASE_URL || process.env.VITE_SPACES_CDN_BASE_URL || '').trim();
  const bucket = (env.DO_SPACES_BUCKET || process.env.DO_SPACES_BUCKET || '').trim();
  const region = (env.DO_SPACES_REGION || process.env.DO_SPACES_REGION || 'sfo3').trim();
  const destDir = (env.DO_SPACES_DEST_DIR || process.env.DO_SPACES_DEST_DIR || 'my-portfolio/videos').trim();
  const projectRoot = destDir.replace(/^\/+|\/+$/g, '').replace(/\/?(videos|images|assets).*$/, '') || 'my-portfolio';

  let base = '/my-portfolio/';
  if (rawCdn) {
    const cleanCdn = rawCdn.replace(/\/+$/, '').replace(/\/(videos|images|assets).*$/, '');
    base = `${cleanCdn}/`;
  } else if (bucket) {
    base = `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${projectRoot}/`;
  }

  const preloadCriticalFonts = {
    name: 'preload-critical-fonts',
    apply: 'build' as const,
    writeBundle(outputOptions: { dir?: string; file?: string }) {
      const outputDir = outputOptions.dir || (outputOptions.file ? path.dirname(outputOptions.file) : 'dist');
      const indexPath = path.join(outputDir, 'index.html');
      const assetsDir = path.join(outputDir, 'assets');
      if (!fs.existsSync(indexPath) || !fs.existsSync(assetsDir)) return;

      const preloadLinks = fs.readdirSync(assetsDir)
        .filter(
          (file) =>
            file.endsWith('.woff2') &&
            CRITICAL_FONT_PREFIXES.some((prefix) => file.includes(prefix))
        )
        .map(
          (file) =>
            `    <link rel="preload" href="${base}assets/${file}" as="font" type="font/woff2" crossorigin="anonymous">`
        )
        .join('\n');

      if (preloadLinks) {
        const html = fs.readFileSync(indexPath, 'utf8');
        fs.writeFileSync(indexPath, html.replace('</head>', `${preloadLinks}\n  </head>`));
      }
    },
  };

  return {
    plugins: [react(), preloadCriticalFonts],
    base,
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('gsap')) {
                return 'vendor-gsap';
              }
              return 'vendor-utils';
            }
          },
        },
      },
    },
  };
});
