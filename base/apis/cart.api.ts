import apiBase from "../axios/api-base";
import { ListParams } from "../models/common.model";

const urlDefault = '/cart';

export const cartApis = {
    getListByCustomer: (data: ListParams) => {
        return apiBase.get(`${urlDefault}?page=${data.page}&limit=${data.limit}`);
    },
    getCountByCustomer: () => {
        return apiBase.get(`${urlDefault}/count`);
    },
    create: (data: any) => {
        return apiBase.post(`${urlDefault}`, data);
    },
    createMany: (data: any) => {
        return apiBase.post(`${urlDefault}/sync-cart`, data);
    },
    update: (data: any) => {
        return apiBase.put(`${urlDefault}/${data?.id}`, data);
    },
    remove: (id: string) => {
        return apiBase.delete(`${urlDefault}/${id}`);
    },
}