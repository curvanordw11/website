<template>
    <div class="login">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
            <h3 class="title">翼星后台管理系统</h3>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" type="text" placeholder="账号">
                    <el-icon slot="prefix"><User /></el-icon>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="密码" @keyup.enter.native="handleLogin">
                    <el-icon slot="prefix"><Key /></el-icon>
                </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form-item>
        </el-form>
        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright &copy; 2023.WINGSTAR All rights reserved.&nbsp;&nbsp;<a target="_blank" style="color: white;" href="#">翼星留学</a></span>
        </div>
    </div>
</template>
  
<script>
import http from '@/utils/request.js'
import { User, Key } from '@element-plus/icons-vue'

export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            loginRules: {
                username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
                password: [{ required: true, trigger: "blur", message: "请输入您的密码" }]
            },
            loading: false
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    const options = {
                        method: 'POST',
                        url: '/user/login',
                        data: {
                            account: this.loginForm.username,
                            password: window.btoa(this.loginForm.password)
                        }
                    };
                    http.request(options).then((res) => {
                        window.sessionStorage.setItem('token', res.content.token)
                        this.$router.push({ name: "admin", params: { url: 'DocMgr' } })
                    }).catch(() => {
                        this.loading = false
                    })
                }
            })
        }
    },
    components: { User, Key }
}
</script>
  
<style rel="stylesheet/scss" lang="scss" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("@/assets/login-background.jpg");
    background-size: cover;
}

.title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
}

.login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;

    .el-input {
        height: 38px;

        input {
            height: 38px;
        }
    }

    .input-icon {
        height: 39px;
        width: 14px;
        margin-left: 2px;
    }
}

.login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}

.login-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
        cursor: pointer;
        vertical-align: middle;
    }
}

.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
}

.login-code-img {
    height: 38px;
}
</style>