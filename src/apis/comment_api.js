import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8080/admin/comment/',
    timeout: 5000,
    withCredentials: true
});

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