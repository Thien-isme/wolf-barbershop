using System;

namespace barbershop.Models.ResponseDTOs
{
    public class PaymentServicesDTO
    {
        public int PaymentServiceId { get; set; }
        public int PaymentId { get; set; }
        public int ServiceId { get; set; }
        public decimal Price { get; set; }
    }
}
