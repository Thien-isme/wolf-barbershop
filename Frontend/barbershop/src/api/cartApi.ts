import api from './axios';
import type { SaveToCartRequest } from '../types/RequestDTOs/SaveToCartRequest';
export const SaveToCart = (saveToCartRequest: SaveToCartRequest) => {
    return api
        .post('/Cart/SaveToCart', saveToCartRequest) // Sử dụng POST và truyền payload vào body
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi thêm vào giỏ hàng:', err);
            throw err;
        });
};


export const GetProductInCartsOfUser = () => {
    return api
        .get("/Cart/GetProductInCartsOfUser")
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi lấy sản phẩm trong giỏ hàng:', err);
            throw err;
        });
};