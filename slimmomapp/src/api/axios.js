import axios from "axios";
import { getAuthToken } from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
