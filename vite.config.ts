import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { loadEnv } from 'vite'

export default ({ mode }) => {
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        "@assets": resolve(__dirname, "src/assets"),
        "@components": resolve(__dirname, "src/components"),
        "@views": resolve(__dirname, "src/views"),
        "@store": resolve(__dirname, "src/store"),
        "@utils": resolve(__dirname, "src/utils"),
        "@router": resolve(__dirname, "src/router")
      }
    },
    base: './', // 设置打包路径
    server: {
      port: 8080, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      host: true,
      // 设置代理，根据我们项目实际情况配置
      proxy: {
        '/space': {
          target: loadEnv(mode, process.cwd()).VITE_APP_UPLOAD_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace('/space/', '/')
        }
      }
    }
  })
}
