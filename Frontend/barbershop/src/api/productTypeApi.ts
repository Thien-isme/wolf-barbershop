import api from "./axios";

export const getProductType = () => {
    return api.get("/ProductType/GetAllTypes", {})
    .then((res) => res.data)
    .catch((err) => {
        console.error("Lỗi khi lấy danh sách loại sản phẩm:", err);
        throw err;
    });
};







