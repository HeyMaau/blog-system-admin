import axios from "axios";

const request = axios.create({
    baseURL: process.env.VUE_APP_SERVER_PATH + "/image/",
    timeout: 5000,
    withCredentials: true,
    headers: {'Authorization': sessionStorage.getItem('token')}
});

export function uploadImage(data) {
    return request.post('', data)
}