import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // リポジトリ名（my-react-todo）を / で囲んで書きます
  base: '/my-react-todo/', 
})
