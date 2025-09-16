import type { ProductDTO } from "./productDTO";

export type ProductTypeDTO = {
  productTypeId: number;
  productTypeName: string;
  products: ProductDTO[];
};