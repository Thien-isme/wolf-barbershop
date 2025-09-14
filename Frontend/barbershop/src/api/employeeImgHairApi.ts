import api from "./axios";

export const getEmployeeImgHair = async (data: any) => {
    try {
        const res = await api.get(`/EmployeeImgHair/GetAllByEmployeeId?employeeId=${data.employeeId}`);
        return res.data;
    } catch (error) {
        // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
        console.error("Lỗi khi lấy danh sách ảnh tóc nhân viên:", error);
        throw error; // hoặc trả về giá trị tùy ý
    }
};



