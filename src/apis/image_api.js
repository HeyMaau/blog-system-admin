import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8080/admin/image',
    timeout: 5000,
    withCredentials: true
});

export function uploadImage(data) {
    return request.post('', data)
}