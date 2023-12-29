import axios from "axios";
import router from "../routers";

const request = axios.create({
    baseURL: import.meta.env.VITE_SERVER_PATH + '/admin/statistics',
    timeout: 5000
});

request.interceptors.request.use(config => {
    config.headers!['authorization'] = sessionStorage.getItem('token')
    return config
})

request.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 403) {
        router.push('/login')
    }
    return Promise.reject(error);
});

export function getTotalVisit() {
    return request.get('/total')
}

export function getClientTotalVisit(client: string) {
    return request.get('/total/' + client)
}