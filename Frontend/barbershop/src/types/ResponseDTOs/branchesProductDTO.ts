// Make sure to import related DTOs
import type { BranchDTO } from './branchDTO';
import type { ProductDTO } from './productDTO';
import type { SizeDTO } from './sizeDTO';

export type BranchesProductDTO = {
    branchesProductsId: number;
    branchId?: number;
    productId?: number;
    quantity?: number;
    sizeId?: number;
    updateAt?: Date;
    branchDTO?: BranchDTO;
    productDTO?: ProductDTO;
    sizeDTO?: SizeDTO;
};
