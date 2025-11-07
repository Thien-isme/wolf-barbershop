import api from './axios';

export const getAllSizes = async () => {
    const response = await api
        .get('/Size/sizes')
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi lấy danh sách size:', err);
            throw err;
        });
    return response;
};
