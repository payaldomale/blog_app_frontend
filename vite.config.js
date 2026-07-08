import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      // '9c2f-49-36-41-67.ngrok-free.app' // paste the url given by ngrok
    ],
    // host: true,
    // port: 5173,
  },
})
