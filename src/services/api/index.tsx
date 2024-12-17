import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
