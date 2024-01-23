import {getAxiosInstance} from "../utils/get-common-axios-config.ts";
import {BlogAudio} from "../pojo/BlogAudio.ts";

const getRequest = getAxiosInstance('/portal/audio')
const postRequest = getAxiosInstance('/admin/audio')

export function getAudioListApi(page: number, size: number) {
    return getRequest.get('/list', {
        params: {
            page,
            size
        }
    })
}

export function addAudioApi(audio: BlogAudio) {
    return postRequest.post('/add', audio)
}

export function updateAudioApi(audio: BlogAudio) {
    return postRequest.put('/update', audio)
}

export function deleteAudioApi(id: string | undefined | null) {
    return postRequest.delete('/delete/' + id)
}