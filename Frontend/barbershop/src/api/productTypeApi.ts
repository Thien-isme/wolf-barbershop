import api from './axios';

// using for filter
export const getAllProductType = () => {
    return api
        .get('/ProductType/GetAllProductType', {})
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi lấy danh sách loại sản phẩm:', err);
            throw err;
        });
};
