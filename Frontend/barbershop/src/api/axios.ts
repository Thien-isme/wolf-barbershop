import axios from "axios";
import Cookies from "js-cookie";


const api = axios.create({
  baseURL: "http://localhost:5257/api", // hoặc baseURL của bạn
});

// Add a request interceptor to attach accessToken
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      try {
        // Gọi refreshToken bằng body thay vì query string
        const refreshResponse = await api.post(
          "/Auth/refreshToken",
          { refreshToken }, // truyền refreshToken trong body
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        // console.log("Refresh token response:", refreshResponse);
        // console.log("New access token:"+ refreshResponse.data.data); ;
        const data = refreshResponse.data.data;
        Cookies.set("accessToken", data);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed, redirecting to login.");
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
