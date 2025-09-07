import apiBase from "../axios/api-base";
import { ListParams } from "../models/common.model";

const urlDefault = '/order';

export const orderApis = {
    getList: (data: ListParams) => {
        return apiBase.get(`${urlDefault}?page=${data.page}&limit=${data.limit}`,);
    },
    getListOrderedProduct: (orderId: string, data: ListParams) => {
        return apiBase.get(`${urlDefault}/${orderId}/products/?page=${data.page}&limit=${data.limit}`,);
    },
    getById: (id: string) => {
        return apiBase.get(`${urlDefault}/${id}`);
    },
    create: (data: any) => {
        return apiBase.post(`${urlDefault}`, data);
    },
    customerOrder: (data: any) => {
        return apiBase.post(`${urlDefault}/customer`, data);
    },
    update: (data: any) => {
        return apiBase.put(`${urlDefault}/${data?.id}`, data);
    },
    remove: (id: string) => {
        return apiBase.get(`${urlDefault}/${id}`);
    },
}