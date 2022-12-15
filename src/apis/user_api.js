import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8080/user/',
    timeout: 5000,
    withCredentials: true
});

export function login(key, user) {
    const captcha = user.captcha
    delete user.captcha
    return request.post(`login/${key}/${captcha}`, user)
}