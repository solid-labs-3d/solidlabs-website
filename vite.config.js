import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base:'/solidlabs-website/',
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' }
  }
})
