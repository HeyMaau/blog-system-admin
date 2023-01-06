import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8080/admin/article/',
    timeout: 5000,
    withCredentials: true
});

export function getArticles(page, size, keywords, category, state) {
    return request.get('list', {
        params: {
            page,
            size,
            keywords,
            category,
            state
        }
    })
}

export function deleteArticleApi(id) {
    return request.delete('state/' + id)
}

export function topArticleApi(id) {
    return request.put(`top/${id}`)
}