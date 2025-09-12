import axios from "axios";
import { showAlertError } from "../ui/toaster";
import { SESSION_LOCAL_STORAGE_KEY } from "../utils/constants";
import { store } from "../store";
import { setSession } from "../store/slices/session.slice";

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
        store.dispatch(setSession(res.data.data))
    } catch (err) {
      console.error("Refresh token failed", err);
    }
    }
    else if (error.response?.status >= 400) {
      showAlertError(error.response.data?.message || error?.message)
      console.warn( error.response)
    }
    return Promise.reject(error.response.data ?? error)
  }
)

axiosClient.interceptors.request.use(async (config) => {
  const {accessToken, expiredAt} = store.getState().session.user
  if (accessToken && (expiredAt - Math.floor(Date.now() / 1000) <= 5 * 60)) {
    // gọi API refresh
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      if (res.data.success)
        store.dispatch(setSession(res.data.data))

      config.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
    } catch (err) {
      console.error("Refresh token failed", err);
    }
  }

  return config;
});



export default axiosClient