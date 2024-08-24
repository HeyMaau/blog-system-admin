import {getAxiosInstance} from "../utils/get-common-axios-config.ts";
import router from "../routers";
import {ElMessage} from "element-plus";
import {BlogApp} from "../pojo/BlogApp.ts";

const request = getAxiosInstance('/admin/app')

request.interceptors.request.use(config => {
    config.headers['authorization'] = sessionStorage.getItem('token')
    return config
})

request.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 403) {
        router.push('/login')
        ElMessage.error('请重新登录')
    }
    return Promise.reject(error);
});

export function getAppInfoListApi() {
    return request.get('/list')
}

export function updateAppInfoListApi(data: BlogApp) {
    return request.post('', data)
}

export function deleteAppInfoApi(id: string) {
    return request.delete('/delete/' + id)
}
