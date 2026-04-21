import apiBase from "../axios/api-base";
import { ListParams } from "../models/common.model";

const urlDefault = '/user';

export const userApis = {
    getListCustomer: (data: ListParams) => {
        return apiBase.get(`${urlDefault}/customer?page=${data.page}&limit=${data.limit}`,);
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
        return apiBase.delete(`${urlDefault}/${id}`);
    },
}