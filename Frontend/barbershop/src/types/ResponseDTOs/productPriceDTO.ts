import type { ProductDTO } from './productDTO';

export type ProductPriceDTO = {
    productPriceId: number;
    productId: number;
    originalPrice?: number | undefined;
    discountedPrice?: number;
    discountStartDate?: string; // ISO string
    discountEndDate?: string; // ISO string
    isActive?: boolean;
    createdAt?: string; // ISO string
    product?: ProductDTO;
};
