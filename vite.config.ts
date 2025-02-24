import path from 'path';
import { defineConfig } from 'vite';

import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';

// Node.js의 path 모듈

// https://vite.dev/config/
export default defineConfig({
  define: {
    global: 'window',
  },
  plugins: [react(), basicSsl()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
    },
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://algo.knu-soft.site',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
