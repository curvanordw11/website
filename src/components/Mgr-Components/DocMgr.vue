<template>
    <el-card style="margin-bottom: 1rem;">
        <el-button type="primary" @click="dialogVisible = true">新增文章</el-button>
    </el-card>
    <el-card>
        <el-table :data="listData">
            <el-table-column label="文章封面" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image style="width: 180px; height: 100px" :src="scope.row.picture" fit="contain" :preview-src-list="[scope.row.picture]" preview-teleported/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="文章标题" show-overflow-tooltip />
            <el-table-column prop="text" label="文章内容" show-overflow-tooltip />
            <el-table-column prop="blogsType" label="文章分类" show-overflow-tooltip />
            <el-table-column prop="coursesDesc" label="课程内容" show-overflow-tooltip />
            <el-table-column prop="duration" label="课程日期" show-overflow-tooltip />
            <el-table-column prop="arrange" label="课程周期" show-overflow-tooltip />
            <el-table-column prop="releaseTime" label="发布时间">
                <template #default="scope">
                    <span>{{ moment(scope.row.releaseTime).format('ll') }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180" header-align="center">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toDetail(scope.row)">查看</el-button>
                    <el-button link type="primary" size="small" @click="onEdit(scope.row)">修改</el-button>
                    <el-button link type="danger" size="small" @click="onDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="display: flex;justify-content: flex-end;margin-top: 12px;">
            <el-pagination background layout="prev, pager, next" v-model:current-page="pageInfo.page" :page-size="pageInfo.pageSize" @current-change="getNews" :total="pageInfo.total" />
        </div>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="curId ? 'EDIT NEWS' : 'ADD NEWS'" width="60%">
        <el-form ref="formRef" :model="formData" label-position="right" label-width="120px" :rules="formRules" hide-required-asterisk>
            <el-form-item label="文章分类" prop="blogsType">
                <el-select v-model="formData.blogsType">
                    <el-option v-for="item in [...typeMap.entries()]"
                        :key="item[0]"
                        :label="item[1]"
                        :value="item[0]"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item label="文章内容" prop="text">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10 }" v-model="formData.text" />
            </el-form-item>
            <el-form-item label="课程内容" prop="coursesDesc">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10 }" v-model="formData.coursesDesc" />
            </el-form-item>
            <el-form-item label="课程日期" prop="duration">
                <el-input v-model="formData.duration" />
            </el-form-item>
            <el-form-item label="课程周期" prop="arrange">
                <el-input v-model="formData.arrange" />
            </el-form-item>
            <el-form-item label="文章封面" prop="picture">
                <el-upload action="" v-model:file-list="fileList"
                    list-type="picture" accept="image/*"
                    :on-change="onChangeFile"
                    :on-remove="onRemoveFile"
                    :auto-upload="false"
                    :multiple="false"
                    :limit="1">
                    <el-button type="primary">Click to upload</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="onSubmit">Submit</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog title="文章详情" v-model="showDetail" width="60%">
        <Detail :docInfo="docInfo" />
    </el-dialog>
    
</template>

<script setup>
import Detail from './components/Detail-com.vue'
import http from '@/utils/request.js'
import moment from 'moment';
import { ElMessage, ElMessageBox } from 'element-plus'
moment.updateLocale('zh-cn', { longDateFormat: { ll: 'YYYY年M月D日' } })

let pageInfo = reactive({page: 1, pageSize: 5, total: 0})
let listData = ref([])

onMounted(() => {
    getNews()
})
let typeMap = new Map([
    [1, 'Art'],
    [2, 'Academic'],
    [3, 'Leadership'],
])
function getNews() {
    const options = {
        method: 'POST',
        url: '/blogs/getBlogs',
        data: { page: pageInfo.page, pageSize: pageInfo.pageSize }
    };

    http.request(options).then((res) => {
        listData.value = res.content.data
        pageInfo.total = res.content.totalNum
    })
}

let showDetail = ref(false)
let docInfo = ref()
function toDetail(row) {
    docInfo.value = row
    showDetail.value = true;
}

let formRef = ref()
const formData = reactive({
    "blogsType":     1, // 文章分类
    "title":        "", // 文章标题
    "text":         "", // 文章内容
    "coursesDesc":  "", // 课程内容
    "duration":     "", // 课程日期
    "arrange":      "", // 课程周期
    "picture":      "", // 文章封面
})
let formRules = {
    "title":       [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
    "text":        [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
    "coursesDesc": [{ required: true, message: '请输入课程内容', trigger: 'blur' }],
    "duration":    [{ required: true, message: '请输入课程日期', trigger: 'blur' }],
    "arrange":     [{ required: true, message: '请输入课程周期', trigger: 'blur' }],
    "picture":     [{ required: true, message: '请上传文章封面', trigger: 'blur' }],
}
function onSubmit() {
    formRef.value.validate((valid, fields) => {
        if (valid) {
            const add_options = {
                method: 'POST',
                url: '/blogs/saveBlogs',
                data: { ...formData }
            }

            const edit_options = {
                method: 'POST',
                url: '/blogs/editBlogs',
                data: { ...formData, id: curId.value }
            }

            http.request(curId.value ? edit_options : add_options).then((res) => {
                ElMessage({ message: 'Push Success!', type: 'success' })
                getNews()
                formRef.value.resetFields()
                curId.value = null
                dialogVisible.value = false
            })
        }
    })
}
function onDelete(id) {
    ElMessageBox.confirm( '确认删除文章?', 'Warning', {
        confirmButtonText: 'CONFIRM',
        cancelButtonText: 'CANCEL',
        type: 'warning',
    }).then(() => {
        const options = {
            method: 'POST',
            url: '/blogs/delBlogs',
            data: { id }
        }

        http.request(options).then((res) => {
            ElMessage({ message: 'Delete Success!', type: 'success' })
            getNews()
        })
    })
}

let curId = ref(null)
function onEdit(row) {
    curId.value = row.id
    formData.blogsType = row.blogsType
    formData.title = row.title
    formData.text = row.text
    formData.coursesDesc = row.coursesDesc
    formData.duration = row.duration
    formData.arrange = row.arrange
    formData.picture = row.picture
    fileList.value = [{ url: row.picture }]
    dialogVisible.value = true
}

let fileList = ref([])
let dialogVisible = ref(false)
function onChangeFile(uploadFile) {
    if (uploadFile.status == "ready") {
        if (uploadFile.raw.type.includes('image/')) {
            if (window.FileReader) {
                let reader = new FileReader();
                reader.readAsDataURL(uploadFile.raw);
                reader.onload = e => {
                    let base64String = e.target.result;
                    formData.picture = base64String
                    // console.log("bese64编码：", base64String);
                }
            }
        } else {
            ElMessage({ message: '只能上传图片文件', type: 'warning' })
            fileList.value = []
        }
    }
}
function onRemoveFile() {
    fileList.value = []
}
</script>

<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
