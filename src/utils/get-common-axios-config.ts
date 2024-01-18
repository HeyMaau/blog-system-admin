import axios, {AxiosInstance} from "axios";
import router from "../routers";

export function getAxiosInstance(uri: string): AxiosInstance {

    const request = axios.create({
        baseURL: import.meta.env.VITE_SERVER_PATH + uri,
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

    return request
}

