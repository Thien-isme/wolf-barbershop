import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/wolf-barbershop/', // Thay <repository_name> bằng tên repository của bạn
})
