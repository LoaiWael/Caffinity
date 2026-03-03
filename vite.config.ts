import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/v1': {
        target: "https://caffinity-api.vercel.app",
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
