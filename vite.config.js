import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'https://backend-ai-planet.vercel.app', // Replace with your actual backend URL
        target: 'http://localhost:3004',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
