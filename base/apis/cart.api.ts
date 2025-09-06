import apiBase from "../axios/api-base";
import { ListParams } from "../models/common.model";

const urlDefault = '/cart';

export const cartApis = {
    getList: (data: ListParams) => {
        return apiBase.get(`${urlDefault}?page=${data.page}&limit=${data.limit}`);
    },
    create: (data: any) => {
        return apiBase.post(`${urlDefault}`, data);
    },
    update: (data: any) => {
        return apiBase.put(`${urlDefault}/${data?.id}`, data);
    },
    remove: (id: string) => {
        return apiBase.get(`${urlDefault}/${id}`);
    },
}