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
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
  server: {
    fs: {
      allow: [
        // Allow serving files from project root
        process.cwd(),
        // Allow node_modules
        'node_modules',
      ],
      strict: false
    }
  },
  optimizeDeps: {
    exclude: ['cosmic-kaleidoscope.frag']
  },
  assetsInclude: ['**/*.frag', '**/*.vert', '**/*.glsl'],
});