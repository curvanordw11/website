import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import externalGlobals from 'rollup-plugin-external-globals'
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'

import AutoImport from 'unplugin-auto-import/vite'
import importToCDN from 'vite-plugin-cdn-import'

import vue from '@vitejs/plugin-vue'
const externalGlobalsObj = {
    vue: 'Vue',
    'vue-demi': 'VueDemi',
    'vue-router': 'VueRouter',
    'element-plus': 'ElementPlus',
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        importToCDN({
            modules: [
                {
                    name: 'vue',
                    var: 'Vue',
                    path: `https://unpkg.com/vue@3.2.45/dist/vue.global.js`,

                },
                {
                    name: 'vue-demi',
                    var: 'VueDemi',
                    path: `https://unpkg.com/vue-demi@0.13.11`,
                },
                {
                    name: 'vue-router',
                    var: 'VueRouter',
                    path: `https://unpkg.com/vue-router@4.1.6`,
                },
                {
                    name: 'element-plus',
                    var: 'ElementPlus',
                    path: 'https://unpkg.com/element-plus@2.3.3/dist/index.full.js',
                    // css: 'https://unpkg.com/element-plus@2.3.3/dist/index.css'
                },
            ],
        }),
        visualizer(),

        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue']
        }),
        ,
        // 由于AutoImport 会和cdn存在冲突 所以要等  注意一定要放在AutoImport的后面，防止前面会失效
        {
            ...externalGlobals(externalGlobalsObj),
            enforce: 'post',
            apply: 'build',
        },
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
            }
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
