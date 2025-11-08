import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/external/feeds': {
        target: 'https://imediac.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/external\/feeds/, '/feeds'),
      },
      '/external/feed': {
        target: 'https://imediac.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/external\/feed/, '/feed'),
      },
    },
  },
})
