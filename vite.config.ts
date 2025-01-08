// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.frag', '**/*.vert'],
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  optimizeDeps: {
    exclude: ['cosmic-kaleidoscope.frag']
  }
});