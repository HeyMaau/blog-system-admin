import {BaseResponse} from "./BaseResponse.ts";

export interface BlogImage extends BaseResponse {
    data: Data
}

interface Data {
    image_id: string;
    image_name: string;
    image_url: string;
}