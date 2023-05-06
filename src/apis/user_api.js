import axios from "axios";

const request = axios.create({
    baseURL: process.env.VUE_APP_SERVER_PATH + '/user/',
    timeout: 5000,
    withCredentials: true,
});

request.interceptors.request.use(config => {
    config.headers['authorization'] = sessionStorage.getItem('token')
    return config
})

export function login(key, user) {
    const captcha = user.captcha
    delete user.captcha
    return request.post(`login/${key}/${captcha}`, user)
}

export function getUsers(user_name, state, page, size) {
    return request.get('list', {
        params: {
            user_name,
            state,
            page,
            size
        }
    })
}

export function deleteUser(userID) {
    return request.delete(`${userID}`)
}

export function updateUserApi(user) {
    return request.put('user_info/admin', user)
}