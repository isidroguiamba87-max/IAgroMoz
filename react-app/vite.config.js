import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite acesso de outros dispositivos na rede
    port: 3000,
    open: true,
    proxy: {
      '/api': { target: 'http://65.21.165.103', changeOrigin: true },
      '/media': { target: 'http://65.21.165.103', changeOrigin: true },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.js'],
    css: false,
  },
})
