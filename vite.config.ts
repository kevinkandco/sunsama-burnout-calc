
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode, command }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    ...(command === 'build' && process.env.EMBED === 'true' ? {
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
    } : {}),
  },
}));
