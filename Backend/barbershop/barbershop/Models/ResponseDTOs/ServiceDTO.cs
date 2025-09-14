using barbershop.Models.Entitys;
using System;

namespace barbershop.Models.ResponseDTOs
{
    public class ServiceDTO
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public int ServiceTypeId { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int DurationMin { get; set; }
        public bool IsActive { get; set; }
        List<AppointmentService> AppointmentServices { get; set; }
        List<PaymentService> PaymentServices { get; set; }
    }
}
