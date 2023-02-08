import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/font/iconfont.css'

createApp(App).use(router).use(store).mount('#app')

