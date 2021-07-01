import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'

import '@/assets/style/index.scss'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
