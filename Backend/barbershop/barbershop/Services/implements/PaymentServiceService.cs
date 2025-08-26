using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class PaymentServiceService
    {
        private PaymentServiceRepository paymentServiceRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public PaymentServiceService()
        {
            paymentServiceRepository = new PaymentServiceRepository();
        }
        // TODO: Implement service methods for PaymentService
    }
}
