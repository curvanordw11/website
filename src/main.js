import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/display.css'
import './static/element.scss'
import './static/main.css'

function rewriteImport(content) {
    return content.replace(/from ['"]([^'"]+)['"]/g, function (s0, s1) {
        // . ../ /开头的，都是相对路径
        if (s1[0] !== '.' && s1[1] !== '/') {
            return `from '/@modules/${s1}'`
        } else {
            return s0
        }
    })
}


if (url.endsWith('.js')) {
    // js文件
    const p = path.resolve(__dirname, url.slice(1))
    ctx.type = 'application/javascript'
    const content = fs.readFileSync(p, 'utf-8')
    ctx.body = rewriteImport(content)
}

if (url.startsWith('/@modules/')) {
    // 这是一个node_module里的东西
    const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''))
    const module = require(prefix + '/package.json').module
    const p = path.resolve(prefix, module)
    const ret = fs.readFileSync(p, 'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(ret)
}

if (url == '/') {
    ctx.type = "text/html"
    let content = fs.readFileSync('./index.html', 'utf-8')
    content = content.replace('<script ', `
      <script>
        window.process = {env:{ NODE_ENV:'dev'}}
      </script>
      <script 
    `)
    ctx.body = content
}


const app = createApp(App)
app.use(router)
app.mount('#app')
