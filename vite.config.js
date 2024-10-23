import { fileURLToPath, URL } from 'node:url'

import {
  defineConfig,
  loadEnv
} from 'vite';
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import fs from 'fs'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  
  //vite初始化性能优化
  const optimizeDepsElementPlusIncludes = ["element-plus/es"]
  fs.readdirSync("node_modules/element-plus/es/components").map((dirname) => {
    fs.access(
      `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
      (err) => {
        if (!err) {
          optimizeDepsElementPlusIncludes.push(
            `element-plus/es/components/${dirname}/style/css`
          )
        }
      }
    )
  })

  return {
    optimizeDeps: {
      include: optimizeDepsElementPlusIncludes,
    },
    plugins: [
      vue(),
      eslint(),
      AutoImport({
        imports: ['vue'],
        resolvers: [
          // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
          ElementPlusResolver(),
        ],
        
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
        ],
      }),
      //支持vue3的setup函数添加name写法
      VueSetupExtend(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // javascriptEnabled: true,
          additionalData: `@use "./src/styles/theme/variable.scss" as *; @use "./src/styles/theme/index.scss" as *;`,
        },
      },
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'], //import 省略后缀
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_PROXY,
          changeOrigin: true,
          rewrite: path => path.replace(RegExp(`^${env.VITE_APP_BASE_API}`), '')
        }
      }
    }
  }
})