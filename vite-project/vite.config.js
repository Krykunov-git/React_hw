import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to the repository name for GitHub Pages project sites.
  // If your repo name is different, change '/React_hw/' accordingly.
  base: '/React_hw/',
})
