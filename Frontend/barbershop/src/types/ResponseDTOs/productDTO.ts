import type { BrandDTO } from './brandDTO';
import type { InventoryDTO } from './inventoryDTO';
import type { PaymentServiceDTO } from './paymentServiceDTO';
import type { ProductPriceDTO } from './productPriceDTO';
import type { ProductTypeDTO } from './productTypeDTO';
import type { SizeDTO } from './sizeDTO';

export type ProductDTO = {
    productId: number;
    productName?: string;
    productTypeId?: number;
    instruction?: string;
    isActive?: boolean;
    sizeId?: number;
    productImg?: string;
    brandId?: number;
    isOutstanding?: boolean;
    brandDTO?: BrandDTO;
    inventoryDTO?: InventoryDTO[];
    paymentServiceDTO?: PaymentServiceDTO[];
    productPriceDTO?: ProductPriceDTO;
    productTypeDTO?: ProductTypeDTO;
    sizeDTO?: SizeDTO[];

    //Thêm
    sizeName?: string;
    quantity?: number;
};
