<template>
    <el-container>
        <el-header style="background-color: #e0e0e0;display: flex;justify-content: space-between;align-items: center;padding-right: 20px;">
            <div style="width: 200px;overflow-x: hidden;">
                <img src="@/assets/yixinglogo.png" alt="Eduhome" height="60">
            </div>
            <div>
                管理员
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px" style="background-color: #e0e0e0; min-height: calc(100vh - 60px);">
                <el-menu :default-active="curIndex" @select="changeView">
                    <el-menu-item index="DocMgr">文章管理</el-menu-item>
                    <el-menu-item index="MsgMgr">留言管理</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <component v-if="logined" :is="curView[curIndex]" />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import DocMgr from '@/components/Mgr-Components/DocMgr.vue'
import MsgMgr from '@/components/Mgr-Components/MsgMgr.vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

let curIndex = ref()

let logined = ref(false)
let curView = reactive({
    DocMgr: shallowRef(DocMgr),
    MsgMgr: shallowRef(MsgMgr),
})
function changeView(index) {
    curIndex.value = index
    router.replace({ name: 'admin', params: { url: index } })
}
onMounted(() => {
    if (window.sessionStorage.getItem('token')) {
        curIndex.value = route.params.url
        logined.value = true
    } else {
        ElMessage({
            message: "没有用户信息，请先登陆",
            type: 'warning',
            onClose: function() {
                router.push({ name: 'login' })
            }
        })
    }
})
</script>
