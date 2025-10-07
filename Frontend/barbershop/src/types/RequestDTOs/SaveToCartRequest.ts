export type SaveToCartRequest = {
    productId: number;
    sizeId?: number | null; // Thêm | null để không bị lỗi
};
