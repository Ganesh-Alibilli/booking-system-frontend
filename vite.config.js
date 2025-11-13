import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
 base: '/booking-system-frontend/', //  important for GitHub Pages routing
  server: {
    proxy: {
      '/api': {
        target: 'https://booking-system-lomz.onrender.com',
        // target: 'http://localhost:4000',
        changeOrigin: true,
        secure: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
