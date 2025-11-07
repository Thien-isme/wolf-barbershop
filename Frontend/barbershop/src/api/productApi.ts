import api from './axios';

export const getAllProductsToManagement = async () => {
    const response = await api
        .get('/Product/getAllProductsToManagement')
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi lấy danh sách sản phẩm:', err);
            throw err;
        });
    return response;
};

export const getAllProductsIsOutStanding = async () => {
    const response = await api
        .get('/Product/getAllProductsIsOutStanding')
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi lấy danh sách sản phẩm nổi bật:', err);
            throw err;
        });
    return response;
};

export const getAllProductsForSaleAsync = async () => {
    const response = await api
        .get('/Product/getAllProductsForSale')
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi lấy danh sách sản phẩm:', err);
            throw err;
        });

    return response;
};

export const addNewProduct = async (productData: FormData) => {
    const response = await api
        .post('/Product/add', productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi thêm sản phẩm:', err);
            throw err;
        });

    return response;
};
