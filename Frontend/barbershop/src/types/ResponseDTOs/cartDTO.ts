import type { ProductDTO } from './productDTO';
import type { ProductPriceDTO } from './productPriceDTO';
import type { SizeDTO } from './sizeDTO';
import type { UserDTO } from './userDTO';

export type CartDTO = {
    cartId: number;
    userId: number | null;
    productId: number | null;
    sizeId: number | null;
    sizeName: string | null;
    quantity: number | null;
    isAvailable: boolean | null;
    productDTO: ProductDTO | null;
    productPriceDTO: ProductPriceDTO | null; // Thêm thuộc tính ProductPriceDTO
    sizeDTO: SizeDTO | null;
    userDTO: UserDTO | null;
};
