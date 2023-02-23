import axios from "axios";
import {URL_IMAGE} from "@/utils/constants";

const request = axios.create({
    baseURL: URL_IMAGE,
    timeout: 5000,
    withCredentials: true
});

export function uploadImage(data) {
    return request.post('', data)
}