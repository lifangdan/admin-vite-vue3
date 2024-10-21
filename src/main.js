import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import config from '@/config'
import './api/mock/index.js'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './styles/main.scss'

import '@/assets/iconfont/iconfont'
// 全局组件
import gloabComponents from '@/components'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    size: config.size,
    locale: zhCn,
})
app.use(gloabComponents)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')

if (import.meta.env.VITE_NODE_ENV === 'production') {
    console.log = console.error = console.warn = () => {};
}