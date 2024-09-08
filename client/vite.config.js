import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  host: '0.0.0.0', 
  port: process.env.PORT || 3004, 
  plugins: [react()],
})
