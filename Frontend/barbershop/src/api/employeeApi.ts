import api from './axios';

export const getBarbers = async () => {
    try {
        const response = await api.get('/Employee/GetBarbers');
        return response.data;
    } catch (error) {
        // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
        console.error('Lỗi khi lấy danh sách barber:', error);
        throw error; // hoặc trả về giá trị tùy ý
    }
};

export const addBarber = async (data: any) => {
    try {
        const res = await api.post('/Employee/AddBarber', data);
        // console.log(res);
        return res.data;
    } catch (error) {
        // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
        console.error('Lỗi khi thêm barber:', error);
        throw error; // hoặc trả về giá trị tùy ý
    }
};

// using in booking page, cashier invoice page
export const getBarbersInBranch = async (branchId: number) => {
    try {
        const response = await api.get(
            `/Employee/GetBarbersInBranch?branchId=${branchId}`
        );
        return response.data;
    } catch (error) {
        // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
        console.error('Lỗi khi lấy danh sách barber trong chi nhánh:', error);
        throw error; // hoặc trả về giá trị tùy ý
    }
};

export const getBranchIdOfCashier = async (cashier: number) => {
    try {
        const response = await api.get(
            `/Employee/GetBranchIdOfCashier?cashierId=${cashier}`
        );
        return response.data;
    } catch (error) {
        // Xử lý lỗi ở đây (ví dụ: log, trả về thông báo, throw lại lỗi)
        console.error('Lỗi khi lấy chi nhánh của thu ngân:', error);
        throw error; // hoặc trả về giá trị tùy ý
    }
};
