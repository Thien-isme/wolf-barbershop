import api from './axios';

export const getAllBrands = () => {
    return api
        .get('/Brand/GetAllBrands', {})
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi lấy danh sách thương hiệu:', err);
            throw err;
        });
};
