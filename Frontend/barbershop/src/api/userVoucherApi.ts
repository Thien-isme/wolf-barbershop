import api from "./axios";

export const getVoucherOfUser = async () => {
  return api.get('/UserVoucher/get-vouchers-of-user');
};




