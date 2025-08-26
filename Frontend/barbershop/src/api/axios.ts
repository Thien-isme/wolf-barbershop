import axios from "axios";

// Tạo instance với baseURL
const api = axios.create({
  baseURL: "http://localhost:5257/api", // Đổi thành link API của bạn
  timeout: 10000,
});

export default api;
