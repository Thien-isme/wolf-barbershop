export type VoucherDTO = {
  voucherId: number;
  voucherCode: string;
  discountAmount: number;
  expiryDate: Date;
  isActive: boolean;
};