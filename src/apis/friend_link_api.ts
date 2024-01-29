import {getAxiosInstance} from "../utils/get-common-axios-config.ts";
import {BlogFriendLink} from "../pojo/BlogFriendLink.ts";

const getRequest = getAxiosInstance('/portal/friend_link')
const postRequest = getAxiosInstance('/admin/friend_link')

export function getFriendLinkListApi(page: number, size: number) {
    return getRequest.get('/list', {
        params: {
            page,
            size
        }
    })
}

export function addFriendLinkApi(friendLink: BlogFriendLink) {
    return postRequest.post('/add', friendLink)
}

export function updateFriendLinkApi(friendLink: BlogFriendLink) {
    return postRequest.put('/update', friendLink)
}

export function deleteFriendLinkApi(id: string) {
    return postRequest.delete('/delete/' + id)
}