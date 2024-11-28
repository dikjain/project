import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',  // Backend API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^/, ''),  // Optionally remove the '/api' prefix
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['openai'],
  },
});
