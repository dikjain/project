import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://project-t80k.onrender.com/',  
        changeOrigin: true,
        rewrite: (path) => path.replace(/^/, ''),  
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['openai'],
  },
});
