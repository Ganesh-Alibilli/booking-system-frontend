import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  base: '/booking-system/', //  important for GitHub Pages routing
  server: {
    proxy: {
      '/api': {
        target: 'https://booking-system-lomz.onrender.com',
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
