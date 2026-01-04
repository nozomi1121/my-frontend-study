import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // リポジトリ名を「my-react-todo」→から「/my-frontend-study/」に変更
  base: '/my-frontend-study/', 
})
