// vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: process.cwd(),
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
  assetsInclude: ['**/*.frag', '**/*.vert', '**/*.glsl'],
  server: {
    fs: {
      allow: [
        process.cwd(),
        'node_modules',
      ],
      strict: false
    }
  },
  plugins: [{
    name: 'vite-plugin-glsl',
    transform(code, id) {
      if (/\.(glsl|vert|frag)$/.test(id)) {
        return {
          code: `export default ${JSON.stringify(code)};`,
          map: null
        };
      }
    }
  }]
});
