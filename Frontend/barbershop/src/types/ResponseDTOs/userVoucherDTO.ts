import type { UserDTO } from "./userDTO";
import type { VoucherDTO } from "./voucherDTO";

export type UserVoucherDTO = {
    UserVoucherId?: number;
    UserId?: number;
    VoucherId?: number;
    Quantity?: number;
    IsActive?: boolean;
    User?: UserDTO;
    Voucher?: VoucherDTO;
};


