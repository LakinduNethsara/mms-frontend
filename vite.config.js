import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default {
  server: {
    host: '0.0.0.0',  // Binds to all IP addresses
    port: 5173,
  },
};
