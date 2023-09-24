<script setup>
import moment from 'moment';
moment.updateLocale('zh-cn', { longDateFormat: { ll: 'YYYY年M月D日' } })
const props = defineProps({ 
    docInfo: Object
})
</script>

<template>
    <el-main v-loading="!docInfo" element-loading-background="rgba(0,0,0,0.1)">
        <el-row v-if="docInfo" justify="space-around" style="align-items: flex-start;">
            <el-col :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
                <div class="about-img">
                    <img :src="docInfo.picture" alt="about" style="width: 100%;object-fit: cover;" height="350">
                </div>
            </el-col>
            <el-col :xs="22" :sm="22" :md="12" :lg="12" :xl="12">
                <div style="max-height: 1000px;display: flex;flex-direction: column; justify-content: space-between;align-items: start;">
                    <div class="vhtml" v-if="docInfo.html" v-html="docInfo.html" />
                    <div v-else>
                        <div class="title">{{docInfo.title}}</div>
                        <div class="text">{{docInfo.text}}</div>
                        <div class="text">课程内容: {{docInfo.coursesDeesc}}</div>
                        <div class="text">课程日期：{{docInfo.duration}}</div>
                        <div class="text">课程周期：{{docInfo.arrange}}</div>
                        <div>发布时间{{moment(docInfo.releaseTime).format('ll')}}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-main>
</template>

<style lang="scss" scoped>
.title {
    margin-bottom: 1rem;
    font-size: 20px;
    color: #303030;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    line-height: 24px;
}
.text {
    margin-bottom: 1rem;
    width: 100%;
    font-size: 14px;
    color: dimgrey;
    text-align: left;
    white-space: pre-wrap;
}
</style>