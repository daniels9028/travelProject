import axios from "../axios/axios"
import { UploadImageCredentials } from "../types/upload/credential"
import { UploadImageResponse } from "../types/upload/response"

const uploadImageService = async (crendetials: UploadImageCredentials): Promise<UploadImageResponse> => {
    const response = await axios.post<UploadImageResponse>('upload-image', crendetials, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

export default { uploadImageService }