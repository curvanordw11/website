import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'

import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
// 👇 用于将外部导入转换为全局变量 👇
import externalGlobals from "rollup-plugin-external-globals";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        visualizer(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue']
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        chunkSizeWarningLimit: 800,
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/static/[ext]/[name]-[hash].[ext]'
            },
            // 👇 告诉打包工具 "vue-demi" 也是外部依赖项 👇
            external: ["vue", "element-plus", "vue-demi"],
            plugins: [
                externalGlobals({
                    vue: "Vue",
                    "element-plus": "ElementPlus",
                    // 👇 配置 vue-demi 全局变量 👇
                    "vue-demi": "VueDemi",
                }),
            ]
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://10.10.10.27:7201',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/')
            }
        }
    }
})
