import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/display.css'
import './static/element.scss'
import './static/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
