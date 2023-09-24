<script setup>
import http from '@/utils/request.js'
import moment from'moment'
import { useRouter } from 'vue-router';
const router = useRouter()
let curType = ref('Art')
let dataList = ref([])

onMounted(() => {
    getNews(curType.value)
})
moment.updateLocale('zh-cn', { longDateFormat: { ll: 'YYYY年M月D日' } })
let typeMap = new Map([
    ['All', null],
    ['Art', 1],
    ['Academic', 2],
    ['Leadership', 3],
])
function getNews(type) {
    curType.value = type
    const options = {
        method: 'POST',
        url: '/blogs/getBlogs',
        data: { page: 1, pageSize: 4, blogsType: typeMap.get(type) }
    };

    http.request(options).then((res) => {
        dataList.value = res.content.data
    })
}
function toList() {
    router.push({name: 'event-list', params: {type: curType.value}})
}
function toDetail(id) {
    router.push({name: 'detail', params: {id: id, type: curType.value}})
}
</script>

<template>
    <el-row justify="space-around" style="align-items: center;margin: 4rem 0;">
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" v-for="t in ['Art','Academic','Leadership']" @click="getNews(t)">
            <div style="height: 50px;display: flex;justify-content: center;align-items: center;font-family: 'Open Sans', sans-serif;font-size: 30px;color: white" :style="{backgroundColor: curType == t ? '#ccafb4' : '#96858f'}">{{t}}</div>
        </el-col>
    </el-row>
    <div class="container">
        <el-row style="align-items: center;padding-bottom: 60px;padding-top: 2rem;" :gutter="30">
            <el-col :span="24" style="text-align: center;padding-bottom: 2rem;">
                <img src="@/assets/icon-book.png" alt="section-title">
                <h2>LATEST NEWS</h2>
            </el-col>
            <el-col v-for="i in dataList" :key="i.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" style="margin-bottom: 2rem;">
                <el-card :body-style="{ padding: '0px' }" shadow="always" @click="toDetail(i.id)">
                    <img :src="i.picture" style="width: 100%;" />
                    <div class="course-content">
                        <p>{{i.title}}</p>
                        <p style="text-align: right;">{{ moment(i.releaseTime).format('ll')}}</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
    <div class="trapezoid" @click="toList">
        <span class="learn-more">Learn More</span>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding: 0 3rem;
    h2 {
        font-size: 34px;
        color: #000;
        font-weight: 700;
        font-family: 'Open Sans', sans-serif;
        margin-bottom: 30px;
        text-transform: uppercase;
    }
    .course-content {
        padding: 10px 5px 5px 5px;
        text-align: center;
        min-height: 63px;
        h3 {
            font-size: 22px;
            color: #303030;
            text-transform: uppercase;
            font-weight: 700;
            font-family: 'Open Sans', sans-serif;
            margin-bottom: 10px;
        }
    }
}

.trapezoid {
    width: 150px;
    height: 45px;
    background-color: #96858F;
    position: relative;
    clip-path: polygon(0 15px, 15px 0, 100% 0, 100% 100%, 0 100%);
    margin: 60px auto;
    margin-bottom: 100px;
    justify-content: center;
    align-items: center;
    display: flex;
}
</style>