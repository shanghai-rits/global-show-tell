import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html', // Main app entry
        opencall: './src/opencall.html', // Additional HTML page
        collaboration: './src/collaboration.html', // Additional HTML page
        homepage: './public/homepage/index.html', // Additional HTML page
      },
    },
  },
})