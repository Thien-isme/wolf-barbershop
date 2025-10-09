using System;

namespace barbershop.Models.ResponseDTOs
{
    public class PaymentsMethodDTO
    {
        public int PaymentMethodId { get; set; }

        public string? MethodName { get; set; } = null!;

        public string? ImgUrl { get; set; }

        public bool IsActive { get; set; }

    }
}
