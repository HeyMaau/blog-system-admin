import axios from "axios";
import router from "@/routers";
import {ElMessage} from "element-plus";

const request = axios.create({
    baseURL: import.meta.env.VITE_SERVER_PATH + '/admin/comment',
    timeout: 5000,
    withCredentials: true,
});

request.interceptors.request.use(config => {
    config.headers['authorization'] = localStorage.getItem('token')
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

export function getCommentsApi(page, size, state, type) {
    return request.get('/list', {
        params: {
            page,
            size,
            state,
            type
        }
    })
}

export function deleteCommentByState(id) {
    return request.delete('/state/' + id)
}

export function recoverComment(id) {
    return request.put('/recover/' + id)
}

export function topComment(id) {
    return request.put('/top/' + id)
}