import axios from "axios";

const request = axios.create({
    baseURL: process.env.VUE_APP_SERVER_PATH + '/admin/category/',
    timeout: 5000,
    withCredentials: true,
});

request.interceptors.request.use(config => {
    config.headers['authorization'] = sessionStorage.getItem('token')
    return config
})

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