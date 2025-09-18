import apiBase from "../axios/api-base";

const urlDefault = '/auth';

export const authApis = {
    login: (data: any) => {
        return apiBase.post(`${urlDefault}/login`, data);
    },
    register: (data: any) => {
        return apiBase.post(`${urlDefault}/register`, data);
    },
    google: (token: string) => {
        return apiBase.get(`${urlDefault}/google`, {headers: {Authorization: `Bearer ${token}`}});
    },
    googleCallback: (data: any) => {
        return apiBase.get(`${urlDefault}/google/callback`,  {headers: {Authorization: `Bearer ${data}`}});
    },
    googleVerify: (data: any) => {
        return apiBase.post(`${urlDefault}/google/verify`,  data);
    },
    logout: () => {
        return apiBase.get(`${urlDefault}/logout`, );
    },
}