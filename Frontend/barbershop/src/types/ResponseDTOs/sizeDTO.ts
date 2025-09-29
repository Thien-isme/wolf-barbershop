import type { ProductDTO } from "./productDTO";

export type SizeDTO = {
  sizeId: number;
  sizeName: string;
  createdAt?: string; // DateTime dạng ISO string
  isActive?: boolean;
  products?: ProductDTO[];
};