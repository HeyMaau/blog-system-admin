import Vue from "vue";
import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8080/user/',
    timeout: 5000,
    withCredentials: true
});

export function login(key, user) {
    const captcha = user.captcha
    delete user.captcha
    console.log(user)
    request.post(`login/${key}/${captcha}`, user).then(value => {
        console.log(value)
        return value
    }).catch(reason => {
        console.log(reason)
        Vue.prototype.$message.error("网络错误")
    })
}