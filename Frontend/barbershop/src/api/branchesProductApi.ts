import api from './axios';

export const GetAllProductInBranch = async () => {
    return await api
        .get('/BranchesProduct/GetAllProductInBranch')
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi lấy sản phẩm trong chi nhánh:', err);
            throw err;
        });
};

//using when payment cashier
export const GetAllProductTypeInBranchOfCashier = async () => {
    return await api
        .get('/BranchesProduct/GetAllProductTypeInBranchOfCashier')
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi lấy loại sản phẩm trong chi nhánh:', err);
            throw err;
        });
};
