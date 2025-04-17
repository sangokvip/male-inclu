import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  base: './',  // 使用相对路径以确保在Cloudflare上静态资源路径正确
  publicDir: 'public',  // 指定静态资源目录
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, // 启用 sourcemap 以便调试
    rollupOptions: {
      input: {
        main: './index.html',
        female: './female.html',
        male: './male.html',
        s: './s.html',
        message: './message.html'
      },
      output: {
        manualChunks: (id) => {
          // 将 React 相关的依赖打包到一个文件中
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-react'
            }
            return 'vendor'
          }
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        }
      }
    }
  },
  define: {
    // 确保环境变量在构建时被正确替换
    'process.env': {}
  }
})