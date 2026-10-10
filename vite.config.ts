import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  // During local development (npm run dev), always serve from root
  if (command === 'serve') {
    return {
      plugins: [react()],
      base: '/',
    };
  }

  // Load environment variables (from .env or process.env)
  const env = loadEnv(mode, process.cwd(), '');
  const rawCdn = (env.VITE_SPACES_CDN_BASE_URL || process.env.VITE_SPACES_CDN_BASE_URL || '').trim();
  const bucket = (env.DO_SPACES_BUCKET || process.env.DO_SPACES_BUCKET || '').trim();
  const region = (env.DO_SPACES_REGION || process.env.DO_SPACES_REGION || 'sfo3').trim();
  const destDir = (env.DO_SPACES_DEST_DIR || process.env.DO_SPACES_DEST_DIR || 'my-portfolio/videos').trim();
  const projectRoot = destDir.replace(/^\/+|\/+$/g, '').replace(/\/?(videos|images|assets).*$/, '') || 'my-portfolio';

  // When CDN is configured, serve built assets (JS, CSS, fonts) with 1-year immutable cache from Spaces CDN
  let base = '/my-portfolio/';
  if (rawCdn) {
    const cleanCdn = rawCdn.replace(/\/+$/, '').replace(/\/(videos|images|assets).*$/, '');
    base = `${cleanCdn}/`;
  } else if (bucket) {
    base = `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${projectRoot}/`;
  }

  return {
    plugins: [react()],
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
