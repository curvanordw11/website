<template>
    <!-- <el-card style="margin-bottom: 1rem;">
        <el-button type="primary" @click="dialogVisible = true">新增文章</el-button>
    </el-card> -->
    <el-card>
        <el-table :data="listData">
            <el-table-column prop="name" label="用户名称" show-overflow-tooltip />
            <el-table-column prop="phone" label="用户手机" show-overflow-tooltip />
            <el-table-column prop="email" label="用户邮箱" show-overflow-tooltip />
            <el-table-column prop="intentionCourses" label="意向课程" show-overflow-tooltip />
            <el-table-column prop="content" label="留言内容" show-overflow-tooltip />
            <el-table-column prop="releaseTime" label="留言时间">
                <template #default="scope">
                    <span>{{ moment(scope.row.releaseTime).format('ll') }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="60" header-align="center">
                <template #default="scope">
                    <el-button link type="danger" size="small" @click="onDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="display: flex;justify-content: flex-end;margin-top: 12px;">
            <el-pagination background layout="prev, pager, next" v-model:current-page="pageInfo.page" :page-size="pageInfo.pageSize" @current-change="getNews" :total="pageInfo.total" />
        </div>
    </el-card>
</template>

<script setup>
import http from '@/utils/request.js'
import moment from 'moment';
import { ElMessage, ElMessageBox } from 'element-plus'
moment.updateLocale('zh-cn', { longDateFormat: { ll: 'YYYY年M月D日' } })

let pageInfo = reactive({page: 1, pageSize: 10, total: 0})
let listData = ref([])

onMounted(() => {
    getNews()
})
function getNews() {
    const options = {
        method: 'POST',
        url: '/message/getPageMessage',
        data: { page: pageInfo.page, pageSize: pageInfo.pageSize }
    };

    http.request(options).then((res) => {
        listData.value = res.content.data
        pageInfo.total = res.content.totalNum
    })
}
function onDelete(id) {
    ElMessageBox.confirm( '确认删除留言?', 'Warning', {
        confirmButtonText: 'CONFIRM',
        cancelButtonText: 'CANCEL',
        type: 'warning',
    }).then(() => {
        const options = {
            method: 'POST',
            url: '/message/delMessage',
            data: { id }
        }

        http.request(options).then((res) => {
            ElMessage({ message: 'Delete Success!', type: 'success' })
            getNews()
        })
    })
}
</script>

<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
