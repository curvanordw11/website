import axios from "axios";
import { ElMessage } from 'element-plus'

const Api = axios.create({
    baseURL: '/api',
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: true, // 跨域请求时是否需要使用凭证
    timeout: 30000, // 请求超时时间
});

// 错误处理函数
function errorHandle(response) {
    switch (response.status) {
        case 400:
            // 处理错误信息，例如抛出错误信息提示，或者跳转页面等处理方式。
            // return Promise.resolve(error)
            break;
        default:
            if (response.message.includes("timeout")) {
                ElMessage({ message: "请求超时", type: 'warning' })
            } else {
                ElMessage({ message: "未知错误", type: 'warning' })
            }
            return Promise.reject(response)
    }
}
// 成功处理函数

function successHandle(response) {
    if (response.data.code == '100004') {
        ElMessage({
            message: "登录状态过期，请重新登陆",
            type: 'warning',
            onClose: function() {
                location.replace('#/login')
            }
        })
        return Promise.reject(response.data.message);
    } else if (response.data.code !== '000000') {
        ElMessage({ message: response.data.message, type: 'warning' })
        return Promise.reject(response.data.message);
    } else {
        return response.data
    }
}
// 请求拦截器
Api.interceptors.request.use(
    (config) => {
        if (window.sessionStorage.getItem('token')) {
            config.headers.Authorization = "Bearer " + window.sessionStorage.getItem('token')
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => {
        return successHandle(response);
    },
    (err) => {
        return errorHandle(err);
    }
);

export default Api;