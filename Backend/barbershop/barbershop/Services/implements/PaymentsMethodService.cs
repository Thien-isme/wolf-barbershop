using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class PaymentsMethodService
    {
        private PaymentsMethodRepository paymentsMethodRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public PaymentsMethodService()
        {
            paymentsMethodRepository = new PaymentsMethodRepository();
        }
        // TODO: Implement service methods for PaymentsMethod
    }
}
