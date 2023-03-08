import axios from "axios";

const request = axios.create({
    baseURL: process.env.VUE_APP_SERVER_PATH + '/admin/comment/',
    timeout: 5000,
    withCredentials: true,
});

request.interceptors.request.use(config => {
    config.headers['authorization'] = sessionStorage.getItem('token')
    return config
})

export function getComments(page, size, state) {
    return request.get('list', {
        params: {
            page,
            size,
            state
        }
    })
}

export function deleteCommentByState(id) {
    return request.delete('state/' + id)
}

export function recoverComment(id) {
    return request.put('recover/' + id)
}

export function topComment(id) {
    return request.put('top/' + id)
}