<script setup>
import http from '@/utils/request.js'
import List from './EventList-list.vue';
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
const route = useRoute()
const router = useRouter()

let curType = ref(route.params.type)
let pageInfo = reactive({page: 1, pageSize: 5, total: 0})
let listData = ref([])

onMounted(() => {
    getNews(0)
})
let typeMap = new Map([
    ['All', null],
    ['Art', 1],
    ['Academic', 2],
    ['Leadership', 3],
])

function getNews(pageParams) {
    router.replace({name: 'event-list', params: {type: curType.value}})
    const options = {
        method: 'POST',
        url: '/blogs/getBlogs',
        data: { page: pageParams, pageSize: pageInfo.pageSize, blogsType: typeMap.get(curType.value) }
    };

    http.request(options).then((res) => {
        listData.value = res.content.data
        pageInfo.total = res.content.totalNum
    })
}

watch(curType, (newVal, oldVal) => {
    getNews(0)
})
watch(() => pageInfo.page, (newVal, oldVal) => { 
    getNews(pageInfo.page) 
})
</script>

<template>
    <el-row style="align-items: center;padding-bottom: 60px;padding-top: 2rem;" :gutter="30">
        <el-col :span="21" :offset="3" style="padding-bottom: 2rem;">
            <div class="title">NEWS AND COURSES</div>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" :offset="3" class="hidden-sm-and-down" style="text-align: center;padding-bottom: 2rem;">
            <el-tabs tab-position="left" v-model="curType">
                <el-tab-pane name="All" label="All"><List :data="listData" /></el-tab-pane>
                <el-tab-pane name="Art" label="Art"><List :data="listData" /></el-tab-pane>
                <el-tab-pane name="Academic" label="Academic"><List :data="listData" /></el-tab-pane>
                <el-tab-pane name="Leadership" label="Leadership"><List :data="listData" /></el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="hidden-md-and-up" style="text-align: center;padding-bottom: 2rem;">
            <el-tabs v-model="curType">
                <el-tab-pane name="All" label="All"><List :data="listData" /></el-tab-pane>
                <el-tab-pane name="Art" label="Art"><List :data="listData" /></el-tab-pane>
                <el-tab-pane name="Academic" label="Academic"><List :data="listData" /></el-tab-pane>
                <el-tab-pane name="Leadership" label="Leadership"><List :data="listData" /></el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="24">
            <el-row justify="end">
                <el-pagination background layout="prev, pager, next" v-model:current-page="pageInfo.page" :page-size="pageInfo.pageSize" :total="pageInfo.total" />
                <el-col :span="3"></el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.title {
    font-size: 20px;
    color: #303030;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    margin-bottom: 10px;
    line-height: 26px;
}
</style>