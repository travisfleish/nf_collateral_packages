import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    preserveSymlinks: true,
    alias: {
      '@genius-sports/gs-marketing-ui/assets': path.resolve(
        __dirname,
        'node_modules/@genius-sports/gs-marketing-ui/dist/assets'
      ),
    },
  },
  optimizeDeps: {
    exclude: ['@genius-sports/gs-marketing-ui'],
  },
})
