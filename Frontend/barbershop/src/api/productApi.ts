import api from "./axios";

export const getAllProductsToManagement= async () => {
    const response = await api.get("/Product/getAllProductsToManagement")
    .then((res) => res.data)
    .catch((err) => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
        throw err;
    });
  return response;
};

