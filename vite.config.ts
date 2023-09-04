import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { normalizePath } from 'vite';

// 全局 less 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/assets/style/common.less'));


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://service-cqngp86i-1319947040.gz.apigw.tencentcs.com/release/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
    // css 相关的配置
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${variablePath}";`,
        }
      }
    }
})
