import apiBase from "../axios/api-base";
import { ListParams } from "../models/common.model";

const urlDefault = '/product';

export const productApis = {
    getList: (data: ListParams) => {
        return apiBase.get(`${urlDefault}?page=${data.page}&limit=${data.limit}`,);
    },
    getListByCategory: (categoryId: string, data: ListParams) => {
        return apiBase.get(`${urlDefault}/category/${categoryId}?page=${data.page}&limit=${data.limit}`,);
    },
    getById: (id: string) => {
        return apiBase.get(`${urlDefault}/${id}`);
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