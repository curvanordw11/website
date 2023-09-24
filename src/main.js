import { createApp } from '../node_modules/@vue'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/display.css'
import './static/element.scss'
import './static/main.css'

import elementPlus from 'element-plus'

const app = createApp(App)
app.use(router)
app.use(elementPlus)
app.mount('#app')
