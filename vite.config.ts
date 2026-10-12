import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  // During local development (npm run dev), always serve from root
  if (command === 'serve') {
    return {
      plugins: [react()],
      base: '/',
    };
  }

  return {
    plugins: [react()],
    // The critical application shell comes from GitHub Pages (same origin as HTML).
    // The components themselves still opt into Spaces through src/utils/cdn.ts for
    // large media, which keeps that network hop out of the rendering-critical path.
    base: '/my-portfolio/',
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
