<script setup>
import moment from 'moment';
import { useRouter } from 'vue-router';

moment.updateLocale('zh-cn', { longDateFormat: { ll: 'YYYY年M月D日' } })
const router = useRouter()
const props = defineProps({
    data: {
        type: Array,
        default() {
            return []
        }
    }
})

function toDetail(id) {
    router.push({name: 'detail', params: { id: id } })
}
</script>

<template>
    <el-main class="content" v-loading="data.length == 0" element-loading-background="rgba(0,0,0,0.1)">
        <div v-for="paper in data" :key="paper.id" class="line">
            <el-row :gutter="10" @click="toDetail(paper.id)">
                <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                    <img :src="paper.picture" :alt="paper.id" style="object-fit: cover;">
                </el-col>
                <el-col :xs="24" :sm="17" :md="17" :lg="17" :xl="17">
                    <div style="height: 120px;display: flex;flex-direction: column; justify-content: space-between;align-items: start;">
                        <!-- <div style="color: #b54d6d;font-size: 12px;">{{paper.tags}}标签</div> -->
                        <div class="title">{{paper.title}}</div>
                        <div class="text">{{paper.text}}</div>
                        <div>{{moment(paper.releaseTime).format('ll')}}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-main>
</template>

<style lang="scss" scoped>
.content {
    min-height: 300px;
    padding: 0;
    overflow-x: hidden;
    .line {
        margin-bottom: 2rem;
        img {
            height: 120px;
            width: 100%;
        }
        .title {
            font-size: 18px;
            color: #303030;
            font-weight: 400;
            font-family: 'Open Sans', sans-serif;
            text-transform: uppercase;
            line-height: 20px;
            text-align: left;
            
            width: 100%;
            text-overflow: ellipsis;
            word-break: break-all;
            overflow: hidden;
            white-space: nowrap;
        }
        .text {
            width: 100%;
            height: 42px;
            font-size: 14px;
            color: dimgrey;
            text-align: left;

            word-break: break-all;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
    .line::after {
        left: 0;
        bottom: -10px;
        position: absolute;

        content: "";
        height: 1px;
        width: 100%;
        background: #888888 none repeat scroll 0 0;
    }
}
</style>