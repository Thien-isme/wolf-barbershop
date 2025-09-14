export type ProductDTO = {
  productId: number;
  productName: string;
  productTypeId: number;
  price: number;
  discount: number;
  instruction?: string;
  productTypeName?: string;
  isActive?: boolean;
};