import axios from "axios";
import { getToken } from "./AuthToken";

const api = axios.create({
  // NO fijar Content-Type aquí
  // Axios lo setea solo según el payload (JSON o FormData)
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
