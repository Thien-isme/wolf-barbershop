import api from './axios';

export const getServices = async () => {
    try {
        const res = await api.get(`Service/GetAllServices`);
        return res.data;
    } catch (error) {
        // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
        throw error; // hoặc trả về giá trị tùy ý
    }
};

export const getAllServicesIsOutStanding = async () => {
    try {
        const res = await api.get(`Service/GetAllServicesIsOutStanding`);
        return res.data;
    } catch (error) {
        // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
        console.error('Lỗi khi lấy danh sách dịch vụ nổi bật:', error);
        throw error; // hoặc trả về giá trị tùy ý
    }
};
