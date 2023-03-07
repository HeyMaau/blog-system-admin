import axios from "axios";

const request = axios.create({
    baseURL: process.env.VUE_APP_SERVER_PATH + '/admin/article/',
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

export function addArticleApi(article) {
    return request.post('', article)
}

export function getArticleApi(id) {
    return request.get(id)
}

export function updateArticleApi(article) {
    return request.put('', article)
}