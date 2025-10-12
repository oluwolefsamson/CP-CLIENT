import axios from "axios";
import Cookies from "js-cookie";

// ✅ Access the API base URL from your .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Attach Authorization header automatically
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  const temp_token = Cookies.get("temp_token");
  const isLoginEndpoint = config.url?.endsWith("/login");

  if (temp_token && isLoginEndpoint) {
    config.headers.Authorization = `Bearer ${temp_token}`;
  } else if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Handle unauthorized responses globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
      return Promise.reject(
        new Error("Unauthorized or Session Expired. Redirecting to login.")
      );
    }
    return Promise.reject(error);
  }
);

export default api;
