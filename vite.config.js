import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 4173,
    allowedHosts: ['survey-sparow.onrender.com'] // ✅ Add your Render domain here
  }
})
