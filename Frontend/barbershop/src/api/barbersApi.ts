import api from "./axios";


export const getBarbers = async () => {
  try {
    const response = await api.get("/Employee/GetBarbers");
    return response.data;
  } catch (error) {
    // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
    console.error("Lỗi khi lấy danh sách barber:", error);
    throw error; // hoặc trả về giá trị tùy ý
  }
}
