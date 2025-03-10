import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    cors: {
      origin: "https://www.sunsama.com",
      credentials: true
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}) 