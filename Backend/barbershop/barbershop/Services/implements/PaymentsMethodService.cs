using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;
    using System;
    using System.Threading.Tasks;

    public class PaymentsMethodService
    {
        private PaymentsMethodRepository paymentsMethodRepository;
        public PaymentsMethodService()
        {
            paymentsMethodRepository = new PaymentsMethodRepository();
        }

        public async Task<BaseResponse> GetPaymentsMethods()
        {
            try
            {
                var paymentsMethods = await paymentsMethodRepository.GetPaymentsMethods();
                if(paymentsMethods == null || paymentsMethods.Count == 0)
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "No payment methods found",
                        Data = null
                    };
                }

                List<PaymentsMethodDTO> paymentsMethodDTOs = paymentsMethods.Select(pm => new PaymentsMethodDTO
                {
                    PaymentMethodId = pm.PaymentMethodId,
                    MethodName = pm.MethodName,
                    ImgUrl = pm.ImgUrl,
                    IsActive = pm.IsActive
                }).ToList();

                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Payment methods retrieved successfully",
                    Data = paymentsMethodDTOs
                };

            }
            catch (Exception ex) {
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "An error occurred while retrieving payment methods",
                    Data = null
                };
            }


        }
        // TODO: Implement service methods for PaymentsMethod
    }
}
