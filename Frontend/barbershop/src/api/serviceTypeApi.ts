import api from "./axios";

export const getAllServicesTypes = async () => {
    try {
        const res = await api.get(`ServiceType/GetAllServiceTypes`);
        return res.data;
    } catch (error) {
        // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
        console.error("Lỗi khi lấy danh sách dịch vụ:", error);
        throw error; // hoặc trả về giá trị tùy ý
    }
};