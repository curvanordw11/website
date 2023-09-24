<script setup>
let svs = ref([
    { text: '高中申请', img: new URL(`@/assets/service/server1.jpg`, import.meta.url).href },
    { text: '本科申请', img: new URL(`@/assets/service/server2.jpg`, import.meta.url).href },
    { text: '研究生申请', img: new URL(`@/assets/service/server3.jpg`, import.meta.url).href },
    { text: '转学服务', img: new URL(`@/assets/service/server4.jpg`, import.meta.url).href },
    { text: '背景提升', img: new URL(`@/assets/service/server5.jpg`, import.meta.url).href },
    { text: '海外后续服务', img: new URL(`@/assets/service/server6.jpg`, import.meta.url).href },
    { text: '海外游学', img: new URL(`@/assets/service/server7.jpg`, import.meta.url).href },
])
let data = ref([
    {list: '1. 了解学生兴趣爱好个性化选定专业（了解学生申请方向与爱好）'},
    {list: '2. 根据学生需求'},
    {list: '4. 标化冲刺：TOEFL/IELTS，SAT/ACT，GRE/GMAT，AP/IB'},
    {list: '5. 背景提升和个性化文书撰写及润色'},
    {list: '6. 帮助学生完成申请填写'},
    {list: '7. 帮助学生提交所有申请资料'},
    {list: '8. 面试模拟培训'},
    {list: '9. 最终选定学校'},
    {list: '10. 行前准备服务'},
    {list: '11. 留学经验分享'},
    {list: '12. 海外后续服务'}
])
</script>

<template>
    <div class="banner-content-wrapper">
        <div class="banner-content">
            <h2>service</h2>
        </div> 
    </div>
    <div class="container">
        <el-row style="align-items: center;padding-bottom: 60px;padding-top: 2rem;" :gutter="30">
            <el-col :span="24" style="text-align: center;padding-bottom: 2rem;">
                <img src="@/assets/icon-book.png" alt="section-title">
                <h2>服务类型</h2>
            </el-col>
            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" style="margin-bottom: 2rem;" v-for="i in svs" :key="i.text">
                <el-card :body-style="{ padding: '0px' }" shadow="always">
                    <el-image fit="cover" :src="i.img" style="width: 100%;"></el-image>
                    <div class="course-content">
                        <h3>{{i.text}}</h3>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
    <el-row justify="space-around" style="align-items: flex-end;margin-bottom: 150px;">
        <el-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10">
            <div class="about-img">
                <img src="@/assets/service/server8.jpg" alt="about" style="width: 100%; object-fit: cover;" height="350">
            </div>
        </el-col>
        <el-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10">
            <div style="margin-bottom: 20px;">申请步骤</div>
            <el-scrollbar style="box-shadow: 0 0 3px 0 #949494;padding: 10px;margin-bottom: 8px;height: 350px;">
                <p v-for="i in data" style="line-height: 2.5rem;">{{ i.list }}</p>
            </el-scrollbar>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.banner-content-wrapper {
    background-image: url('@/assets/long_logo.png');
    background-repeat: no-repeat;
    background-size:100% 100%;
    .banner-content {
        width: 100%;
        height: 30vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba($color: #000000, $alpha: 0.2);
        h2 {
            font-size: 40px;
            color: #fff;
            font-family: 'Open Sans', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            position: relative;
        }
    }
}
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
        background-color: #CBC2C7;
        padding: 10px 5px 5px 5px;
        text-align: center;
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

.el-card {
    // border: 0;
    background-color: #CBC2C7;
}
</style>
