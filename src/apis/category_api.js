import axios from "axios";
import router from "@/routers";
import {ElMessage} from "element-plus";

const request = axios.create({
    baseURL: import.meta.env.VITE_SERVER_PATH + '/admin/category/',
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
        ElMessage.error('请重新登录')
    }
    return Promise.reject(error);
});

export function getCategoriesApi(page, size) {
    return request.get('list', {
        params: {
            page,
            size
        }
    })
}

export function recoverCategory(id) {
    return request.put(id)
}

export function deleteCategory(id) {
    return request.delete(`${id}`)
}

export function updateCategory(category) {
    return request.put('', category)
}

export function addCategory(category) {
    return request.post('', category)
}