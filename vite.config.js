import { defineConfig } from 'vite'
import path from 'path'
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
  server: {
    cors: {
      origin: "*",
      credentials: true
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/embed.tsx'),
      name: 'BurnoutCalculator',
      fileName: (format) => `burnout-calculator.${format}.js`,
      formats: ['umd', 'es'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}) 