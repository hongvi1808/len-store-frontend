import axios from "axios";
import { showAlertError } from "../ui/toaster";
import { SESSION_LOCAL_STORAGE_KEY } from "../utils/constants";
import { getSessionLocal } from "../utils/func";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,

  timeout: 60000,
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('erro', error)
    if (error.response?.data?.code === 'TOKEN_EXPIRED') {
      try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      if (res?.data?.success)
        localStorage.setItem(SESSION_LOCAL_STORAGE_KEY, JSON.stringify(res.data.data))
    } catch (err) {
      console.error("Refresh token failed", err);
    }
    }
    if (error.response?.status >= 400) {
      showAlertError(error.response.data?.message || error?.message)
      console.warn( error.response)
    }
    return Promise.reject(error.response.data ?? error)
  }
)

axiosClient.interceptors.request.use(async (config) => {
  const tokenObj = getSessionLocal()
  if (tokenObj && tokenObj.accessToken && (tokenObj.expireAt - Math.floor(Date.now() / 1000) <= 5 * 60)) {
    // gọi API refresh
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      if (res.data.success)
        localStorage.setItem(SESSION_LOCAL_STORAGE_KEY, JSON.stringify(res.data.data))

      config.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
    } catch (err) {
      console.error("Refresh token failed", err);
    }
  }

  return config;
});



export default axiosClient