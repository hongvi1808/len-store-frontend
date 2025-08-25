import apiBase from "../axios/api-base";

const urlDefault = '/auth';

export const authApis = {
    login: (data: any) => {
        return apiBase.post(`${urlDefault}/login`, data);
    },
    register: (data: any) => {
        return apiBase.post(`${urlDefault}/register`, data);
    },
    google: () => {
        return apiBase.get(`${urlDefault}/google`);
    },
    googleCallback: () => {
        return apiBase.get(`${urlDefault}/google/callback`);
    },
    logout: () => {
        return apiBase.get(`${urlDefault}/logout`, {});
    },
}