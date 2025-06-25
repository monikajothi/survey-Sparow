import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Full Render-compatible configuration
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',                 // Required for Render
    port: parseInt(process.env.PORT) || 4173  // Bind to Render's port
  }
})
