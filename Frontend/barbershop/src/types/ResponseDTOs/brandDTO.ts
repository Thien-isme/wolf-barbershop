import type { ProductDTO } from './productDTO';

export type BrandDTO = {
    brandId: number;
    brandName: string;
    description?: string;
    logoPath?: string;
    isActive?: boolean;
    createdAt?: string; // ISO string
    updatedAt?: string; // ISO string
    products?: ProductDTO[];
};
