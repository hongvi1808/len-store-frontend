import apiBase from "../axios/api-base";
import { nanoid } from "nanoid";
import { CLD_UPLOAD_PRESET_NAME } from "../utils/constants";


export const uploadImages = ({files, folderName} : {files: File[], folderName?: string}) => {
    const filePromise = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folderName', folderName || CLD_UPLOAD_PRESET_NAME)
        formData.append('filename', `${nanoid(36)}${file.size}`)
      return apiBase.post(`/upload`, formData, {
            baseURL: '/api', 
            headers: {"Content-Type": "multipart/form-data"}
        });;
    })
    return Promise.all(filePromise)
}