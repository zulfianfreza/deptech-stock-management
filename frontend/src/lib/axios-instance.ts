import { COOKIE_KEY } from "@/constant/common.constant";
import { getCookie, removeCookie } from "@/lib/cookie";
import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = await getCookie(COOKIE_KEY.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      removeCookie(COOKIE_KEY.ACCESS_TOKEN);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
