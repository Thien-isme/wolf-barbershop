using barbershop.Models.Entitys;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class UserVoucherService
    {
        private readonly UserVoucherRepository userVoucherRepository;
        private readonly BaseResponse baseResponse = new BaseResponse();
        public UserVoucherService()
        {
            userVoucherRepository = new UserVoucherRepository();
        }

        public async Task<BaseResponse?> GetVouchersOfUser(long userId)
        {
            try
            {
                var userVoucher = await userVoucherRepository.GetVouchersOfUser(userId);
                if (userVoucher != null)
                {
                    var vouchersDTO = userVoucher.Select(uv => new UserVoucherDTO
                    {
                        UserVoucherId = uv.UserVoucherId,
                        VoucherId = uv.VoucherId,
                        Quantity = uv.Quantity,
                        VoucherDTO = uv.Voucher == null ? null : new VoucherDTO
                        {
                            VoucherId = uv.Voucher.VoucherId,
                            VoucherCode = uv.Voucher.VoucherCode,
                            DiscountType = uv.Voucher.DiscountType,
                            DiscountValue = uv.Voucher.DiscountValue,
                            Description = uv.Voucher.Description,
                            Startdate = uv.Voucher.Startdate,
                            Expdate = uv.Voucher.Expdate,
                            Status = uv.Voucher.Status,
                            MaxDiscount = uv.Voucher.MaxDiscount,
                            MinOrderValue = uv.Voucher.MinOrderValue,
                            VoucherImg = uv.Voucher.VoucherImg,
                            IsActive = uv.Voucher.IsActive
                        }
                    }).ToList();

                    baseResponse.Status = 200;
                    baseResponse.MessageShow = "Lấy voucher của người dùng thành công!";
                    baseResponse.MessageHide = "Get vouchers of user successfully!";
                    baseResponse.Data = vouchersDTO;
                }
                else
                {
                    baseResponse.Status = 404;
                    baseResponse.MessageShow = "Người dùng không có voucher nào!";
                    baseResponse.MessageHide = "User has no vouchers!";
                    baseResponse.Data = null;
                }
            }
            catch (Exception ex)
            {
                baseResponse.Status = 500;
                baseResponse.MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!";
                baseResponse.MessageHide = ex.Message;
                baseResponse.Data = null;
            }
            return baseResponse;
        }




    }
}
