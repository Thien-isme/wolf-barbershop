import api from "./axios";


export const addBranch = async (data: any) => {
  try {
    const res = await api.post("/branch/add", data);
    return res.data;
  } catch (error) {
    // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
    console.error("Lỗi khi thêm chi nhánh:", error);
    throw error; // hoặc trả về giá trị tùy ý
  }
};

export const getBranchs = async () => {
  try {
    const res = await api.get("/branch/getAll");
    return res.data;
  } catch (error) {
    // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
    console.error("Lỗi khi lấy danh sách chi nhánh:", error);
    throw error; // hoặc trả về giá trị tùy ý
  }
};










