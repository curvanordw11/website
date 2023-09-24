import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/display.css'
import './static/element.scss'
import './static/main.css'


// 文件读取流处理函数
const streamToString = stream => {
    // 读取操作涉及到异步，所以使用Promise
    return new Promise((resolve, reject) => {
        const chunks = [];
        // 流读取因为是一个片段一个片段的，每次片段会触发一个data事件
        // 每次事件里我们会拿到一个chunk，我们push到chunks里面
        stream.on('data', chunk => {
            chunks.push(chunk)
        });
        // 读取结束触发end事件，将Buffer处理过后chunks的转成字符串，resolve返回出去
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        // 如果出错直接传递reject
        stream.on('error', reject);
    })
}
const app = createApp(App)
app.use(router)
// 重写请求路径 /@modules/xxx => /node_modules/
app.use(async (ctx, next) => {
    // 只要开头是/@modules/的我们要重写
    if (ctx.path.startsWith('/@modules/')) {
        const moduleName = ctx.path.substr(10);  // => 这步只是处理了vue
        const modulePkg = require(path.join(cwd, 'node_modules', moduleName, 'package.json')); // 拿到package.json
        // 拿到真实路径
        ctx.path = path.join('/node_modules', moduleName, modulePkg.module);
    }
})


app.mount('#app')
