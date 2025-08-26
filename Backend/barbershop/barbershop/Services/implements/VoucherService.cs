using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class VoucherService
    {
        private VoucherRepository voucherRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public VoucherService()
        {
            voucherRepository = new VoucherRepository();
        }
        // TODO: Implement service methods for Voucher
    }
}
