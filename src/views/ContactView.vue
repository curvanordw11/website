<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import http from '@/utils/request.js'

let formRef = ref()
const form = reactive({
    "name": "", //用户名称
    "phone": "", //用户手机
    "email": "", //邮箱
    "intentionCourses": "", //意向课程
    "content": "", //留言内容
    "coursesId": "" //课程id，暂时不用
})
const validPE = (rule, value, callback) => {
    if (!form.email && !form.phone) {
        callback(new Error('Phone和Email至少填写一个'))
    } else {
        callback()
    }
}
let formRules = {
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    phone: [
        { validator: validPE, trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '格式不正确', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    intentionCourses: [
        { required: true, message: '请输入咨询课程', trigger: 'blur' }
    ]
}
function onSubmit() {
    formRef.value.validate((valid, fields) => {
        if (valid) {
            const options = {
                method: 'POST',
                url: '/message/saveMessage',
                data: form
            };

            http.request(options).then((res) => {
                ElMessage({ message: 'Send Success!', type: 'success' })
                formRef.value.resetFields()
            })
        }
    })
}
</script>

<template>
    <el-row justify="center" style="align-items: flex-start;margin: 10vh 0;" :gutter="30">
        <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
            <el-row class="left-top">
                <el-col :xs="8" :sm="8" :md="24" :lg="24" :xl="24">
                    <div class="single-contact">
                        <div class="contact-icon">
                            <img src="@/assets/contact1.png" alt="contact">
                        </div>
                        <div class="contact-add">
                            <h3>address</h3>
                            <p>中国唐山</p>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="8" :sm="8" :md="24" :lg="24" :xl="24">
                    <div class="single-contact">
                        <div class="contact-icon">
                            <img src="@/assets/contact2.png" alt="contact">
                        </div>
                        <div class="contact-add">
                            <h3>Phone</h3>
                            <p>+86 15213173727</p>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="8" :sm="8" :md="24" :lg="24" :xl="24">
                    <div class="single-contact">
                        <div class="contact-icon">
                            <img src="@/assets/contact3.png" alt="contact">
                        </div>
                        <div class="contact-add">
                            <h3>address</h3>
                            <p>美国纽约</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="reply-area">
                <h3>LEAVE A message</h3>
                <p>Please fill in the question you want to ask </p>
                <el-form ref="formRef" :model="form" label-position="top" :rules="formRules" :hide-required-asterisk="true">
                    <el-form-item label="Name" prop="name">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="Phone" prop="phone">
                        <el-input v-model="form.phone" />
                    </el-form-item>
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="form.email" />
                    </el-form-item>
                    <el-form-item label="Subject" prop="intentionCourses">
                        <el-input v-model="form.intentionCourses" />
                    </el-form-item>
                    <el-form-item label="Message">
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10 }" v-model="form.content" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">SEND MESSAGE</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
    
</template>

<style lang="scss" scoped>
.left-top {
    padding-top: 5vh;
    box-shadow: 0px 0px 8px 0px rgb(0 0 0 / 13%);
}
.single-contact {
    text-align: center;
    margin-bottom: 5vh;
    .contact-icon {
        border: 1px solid #e3e3e3;
        border-radius: 50%;
        height: 50px;
        margin: auto auto 20px;
        position: relative;
        text-align: center;
        width: 50px;
        img {
            bottom: 0;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
    }
    .contact-add {
        h3 {
            font-size: 16px;
            color: #303030;
            font-weight: 600;
            font-family: "Open Sans", sans-serif;
            text-transform: capitalize;
            margin-bottom: 8px;
        }
        p {
            font-size: 12px;
            color: #606060;
            font-family: "Open Sans", sans-serif;
            margin-bottom: 0px;
        }
    }
}

.reply-area h3 {
    font-size: 20px;
    color: #303030;
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 15px;
    font-weight: 700;
}

.reply-area p {
    font-size: 14px;
    font-weight: 400;
    color: #606060;
    margin-bottom: 26px;
    line-height: 24px;
    font-family: 'Open Sans', sans-serif;
}

:deep(label) {
    font-size: 14px;
    color: #030303;
    font-weight: 600;
}
</style>