import axios from "axios";
import router from "@/routers";
import Vue from "vue";

const request = axios.create({
    baseURL: process.env.VUE_APP_SERVER_PATH + "/image/",
    timeout: 5000,
    withCredentials: true,
});

request.interceptors.request.use(config => {
    config.headers['authorization'] = sessionStorage.getItem('token')
    return config
})

request.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 403) {
        router.push('/login')
        Vue.prototype.$message.error('请重新登录')
    }
    return Promise.reject(error);
});

export function uploadImageWithWatermark(data) {
    return request.post('watermark', data)
}