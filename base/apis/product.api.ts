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
    getListBySlugCategory: (slug: string, data: ListParams) => {
        return apiBase.get(`${urlDefault}/category/slug/${slug}?page=${data.page}&limit=${data.limit}`,);
    },
    getListByTag: (tag: string, data: ListParams) => {
        return apiBase.get(`${urlDefault}/tag/${tag}?page=${data.page}&limit=${data.limit}`,);
    },
    getById: (id: string) => {
        return apiBase.get(`${urlDefault}/${id}`);
    },
    getBySlug: (slug: string) => {
        return apiBase.get(`${urlDefault}/slug/${slug}`);
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