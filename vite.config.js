export default defineConfig({
  server: {
    cors: {
      origin: "https://www.sunsama.com",
      credentials: true
    }
  },
  // ... rest of your config
}) 