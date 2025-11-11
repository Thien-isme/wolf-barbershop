import api from './axios';
import { toast } from 'react-toastify';
import type { PlusOrSubQuantityRequest } from '../types/RequestDTOs/PlusOrSubQuantityRequest';
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

export const PlusQuantityProduct = async (
    plusOrSubQuantityRequest: PlusOrSubQuantityRequest
) => {
    return await api
        .post('/BranchesProduct/PlusQuantityProduct', plusOrSubQuantityRequest)
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi tăng số lượng sản phẩm:', err);
            throw err;
        });
};

export const SubQuantityProduct = async (
    plusOrSubQuantityRequest: PlusOrSubQuantityRequest
) => {
    return await api
        .post('/BranchesProduct/SubQuantityProduct', plusOrSubQuantityRequest)
        .then(res => res.data)
        .catch(err => {
            toast.error('Không thể giảm số lượng sản phẩm. Vui lòng thử lại!');
            throw err;
        });
};

export const RemoveProductInBranch = async (branchesProductId: number) => {
    return await api
        .patch(
            `/BranchesProduct/RemoveProductInBranch?branchesProductId=${branchesProductId}`
        )
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi xóa sản phẩm trong chi nhánh:', err);
            throw err;
        });
};
