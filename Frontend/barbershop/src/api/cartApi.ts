import api from './axios';
import type { SaveToCartRequest } from '../types/RequestDTOs/SaveToCartRequest';
import type { PlusOrSubQuantityProductInCartRequest } from '../types/RequestDTOs/plusOrSubQuantityProductInCartRequest';
export const SaveToCart = async (saveToCartRequest: SaveToCartRequest) => {
    return await api
        .post('/Cart/SaveToCart', saveToCartRequest) // Sử dụng POST và truyền payload vào body
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi thêm vào giỏ hàng:', err);
            throw err;
        });
};

export const GetProductInCartsOfUser = async () => {
    return await api
        .get('/Cart/GetProductInCartsOfUser')
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi lấy sản phẩm trong giỏ hàng:', err);
            throw err;
        });
};

export const CountProductInCart = async () => {
    return await api
        .get('/Cart/CountProductInCart')
        .then(res => res.data.data)
        .catch(err => {
            console.error('Lỗi khi đếm sản phẩm trong giỏ hàng:', err);
            throw err;
        });
};

export const PlusQuantityInCart = async (
    request: PlusOrSubQuantityProductInCartRequest
) => {
    return await api
        .patch(`/Cart/PlusQuantityInCart`, request)
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi tăng số lượng sản phẩm trong giỏ hàng:', err);
            throw err;
        });
};

export const SubQuantityInCart = async (
    request: PlusOrSubQuantityProductInCartRequest
) => {
    return await api
        .patch(`/Cart/SubQuantityInCart`, request)
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi giảm số lượng sản phẩm trong giỏ hàng:', err);
            throw err;
        });
};

export const RemoveProductInCart = async (cartId: number) => {
    return await api
        .delete(`/Cart/RemoveProductInCart?cartId=${cartId}`)
        .then(res => res.data)
        .catch(err => {
            console.error('Lỗi khi xóa sản phẩm trong giỏ hàng:', err);
            throw err;
        });
};
