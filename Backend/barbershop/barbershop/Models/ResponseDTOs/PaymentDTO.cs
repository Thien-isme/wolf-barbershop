using System;

namespace barbershop.Models.ResponseDTOs
{
    public class PaymentDTO
    {
        public int PaymentId { get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public int PaymentMethodId { get; set; }
    }
}
