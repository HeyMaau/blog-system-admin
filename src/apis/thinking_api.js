import axios from "axios";
import router from "@/routers";
import {ElMessage} from "element-plus";

const request = axios.create({
    baseURL: import.meta.env.VITE_SERVER_PATH + '/admin/thinking',
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

export function getThinkingListApi(page, size, keyword, state) {
    return request.get('/list', {
        params: {
            page,
            size,
            keyword,
            state
        }
    })
}

// eslint-disable-next-line
export function addThinkingApi(thinking) {
    return request.post('', thinking)
}

// eslint-disable-next-line
export function updateThinkingApi(thinking) {
    return request.put('', thinking)
}

export function deleteThinkingApi(id) {
    return request.delete(`/delete/${id}`)
}