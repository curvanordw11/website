import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/display.css'
import './static/element.scss'
import './static/main.css'


const app = createApp(App)

const streamToString = stream => new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
    stream.on('error', reject)
})

// 2. 修改第三方模块的路径
app.use(async (ctx, next) => {
    if (ctx.type === 'application/javascript') {
        const contents = await streamToString(ctx.body)
        // import vue from 'vue'
        // import App from './App.vue'
        ctx.body = contents
            .replace(/(from\s+['"])(?![\.\/])/g, '$1/@modules/')
            .replace(/process\.env\.NODE_ENV/g, '"development"')
    }
})

app.use(router)
app.mount('#app')
