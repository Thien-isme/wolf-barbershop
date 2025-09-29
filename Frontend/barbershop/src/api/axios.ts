import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5257/api", // hoặc baseURL của bạn
});

// Add a request interceptor to attach accessToken
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
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
      const refreshToken = localStorage.getItem("refreshToken");
      const refreshResponse = await fetch("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
        headers: { "Content-Type": "application/json" },
      });
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        localStorage.setItem("accessToken", data.accessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
