import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  base: './',  // 使用相对路径以确保在Vercel上静态资源路径正确
  publicDir: 'img',  // 指定静态资源目录
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    assetsInlineLimit: 0,  // 禁用资源内联，强制所有资源文件生成到dist目录
    rollupOptions: {
      input: {
        main: './index.html',
        female: './female.html',
        male: './male.html'
      },
      output: {
        manualChunks: undefined
      }
    }
  }
})