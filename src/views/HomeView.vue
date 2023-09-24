
<template>
    <el-carousel height="calc(100vh - 104px)" indicator-position="none">
        <el-carousel-item v-for="(item,index) in carouselItem" :key="item.text">
            <div style="width: 100%;height: 100%;">
                <el-image fit="cover" :src="item.img" style="width: 100%;height: 100%;"></el-image>
                <div style="position: absolute; top: 0;left: 0;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
                    <div style="font-size: 100px;letter-spacing:20px;font-family: STXinwei;color: #fff">{{ item.text }}</div>
                </div>
            </div>
        </el-carousel-item>
    </el-carousel>
    <!-- <el-row justify="space-around" style="align-items: center;">
        <el-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10">
        </el-col>
        <el-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10">
        </el-col>
    </el-row> -->
    <el-row justify="space-around" style="align-items: center;">
        <el-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10">
            <div class="about-content">
                <h1>我们的初衷</h1>
                <p>我们反抗现状；</p>
                <p> 我们捍卫纯洁看台；</p>
                <p>我们坚持与珍惜现在的一切。</p>
                <p>脚踏实地</p>
                <p>向世界证明山东人可以搞好看台！</p>
                <div>
                    <p> NO ONE LIKES US, WE DON'T CARE</p>
                </div>
            </div>
        </el-col>
        <el-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10">
            <div class="about-img">
                <img src="@/assets/home/home_banner2.jpg" alt="about" style="width: 100%;object-fit: cover;">
            </div>
        </el-col>
    </el-row>
    <el-row justify="space-around" style="align-items: center;padding-bottom: 80px;">
        <el-col :span="22">
            <div class="about-content">
                <h1>意志的胜利</h1>
            </div>
        </el-col>
        <el-col :xs="22" :sm="10" :md="5" :lg="5" :xl="5">
            <div class="single-service">
                <h2>意志</h2>
                <p></p>
            </div>
        </el-col>
        <el-col :xs="22" :sm="10" :md="5" :lg="5" :xl="5">
            <div class="single-service">
                <h2>铁血</h2>
                <p></p>
            </div>
        </el-col>
        <el-col :xs="22" :sm="10" :md="5" :lg="5" :xl="5">
            <div class="single-service">
                <h2>荣光</h2>
                <p></p>
            </div>
        </el-col>
        <el-col :xs="22" :sm="10" :md="5" :lg="5" :xl="5">
            <div class="single-service">
                <h2></h2>
                <p style="color: #EB5B0E;font-weight: 600;font-family: STXinwei;font-size: 26px">通过意志凝聚铁血，这是我们的荣光。<br/>
                    意志、铁血、荣光, 这就是我们的信条！</p>
            </div>
        </el-col>
    </el-row>
    <div class="container">
<!--        <el-row style="align-items: center;padding-bottom: 100px;" :gutter="30">-->
<!--            &lt;!&ndash; <el-col :span="24" style="text-align: center;padding-bottom: 2rem;">-->
<!--                <h2>latest from blog</h2>-->
<!--            </el-col> &ndash;&gt;-->
<!--            <el-col v-for="i in listData" :key="i.id" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 2rem;">-->
<!--                <div style="display: flex; height: 6rem;box-shadow: #8c8c8c 0px 0px 4px;" @click="router.push({name: 'detail', params: {id: i.id, type: 'All'}})">-->
<!--                    <img :src="i.picture" style="width: 6rem;" />-->
<!--                    <div class="course-content">-->
<!--                        <h3>{{i.title}}</h3>-->
<!--                        <div>-->
<!--                            <el-icon style="vertical-align: text-bottom;"><Clock /></el-icon>-->
<!--                            <span style="vertical-align: middle;margin-left: 0.5rem;">{{ moment(i.releaseTime).format('ll') }}</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </el-col>-->
<!--        </el-row>-->
    </div>
</template>
<script setup>
import { Clock } from '@element-plus/icons-vue'
import http from '@/utils/request.js'
import { useRouter } from 'vue-router';
import moment from'moment'
moment.updateLocale('zh-cn', { longDateFormat: { ll: 'YYYY年M月D日' } })
const router = useRouter()
let listData = ref([])

onMounted(() => {
    getNews()
})
function getNews() {
    const options = {
        method: 'POST',
        url: '/blogs/getBlogs',
        data: { page: 1, pageSize: 6 }
    };

    http.request(options).then((res) => {
        listData.value = res.content.data
    })
}
let carouselItem = ref([
    { text: '', img: new URL(`@/assets/home/home_banner1.jpg`, import.meta.url).href },
    { text: 'xdm', img: new URL(`@/assets/home/home_banner5.jpg`, import.meta.url).href },
    { text: '干件正事', img: new URL(`@/assets/home/home_banner3.jpg`, import.meta.url).href },
    { text: '随我去上点压力', img: new URL(`@/assets/home/home_banner4.jpg`, import.meta.url).href }
])
</script>


<style lang="scss" scoped>
.container {
    padding: 0 3rem;
    background-color: #000;
    h2 {
        font-size: 20px;
        color: #000;
        font-weight: 600;
        font-family: 'Open Sans', sans-serif;
        margin-bottom: 20px;
        text-transform: uppercase;
    }
    .course-content {
        padding: 5px 10px;
        height: 6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        h3 {
            font-size: 16px;
            color: #303030;
            text-transform: uppercase;
            font-weight: 600;
            font-family: 'Open Sans', sans-serif;
            margin-bottom: 10px;
        }
    }
}

.el-carousel__item h3 {
    text-shadow:  0 0 3px #303030;
    color: #fff;
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 58px;
    font-weight: 800;
    line-height: 64px;
}

.el-carousel__item {
    background: repeating-linear-gradient(to right, #9099A2, #6D7993, #96858F)
}

.about-content {
    h1 {
        font-size: 35px;
        //color: #303030;
        color: #000;
        font-weight: 700;
        font-family: STXinwei;
        margin-top: 100px;
        margin-bottom: 10px;
        text-transform: uppercase;
    }

    p {
        font-size: 18px;
        color: #606060;
        font-family: 'Open Sans', sans-serif;
        margin-bottom: 15px;
    }

    div p {
        font-size: 20px;
        color: #6D7993;
        font-family: 'Open Sans', serif;
    }
}

.single-service {
    margin-bottom: 2rem;
    padding: 30px 20px 30px 20px;
    box-shadow: 0 0 12px 0 #e9e9e9;
    h2 {
        font-size: 30px;
        color: #F0360F;
        font-weight: 700;
        font-family: STXinwei;
        margin-bottom: 12px;
    }
    p {
        font-size: 14px;
        color: #606060;
        font-family: 'Open Sans', sans-serif;
        margin-bottom: 0px;
    }
}

.about-img {
    position: relative;
    z-index: 1;
    padding: 0 20px;
    padding-top: 60px;
}
.about-img:after {
    position: absolute;
    border: 10px solid #EB5B0E;
    left: 0;
    bottom: -5px;
    content: "";
    width: 100%;
    height: 76%;
    z-index: -1;
}
</style>
