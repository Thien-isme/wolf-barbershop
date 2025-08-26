using System;

namespace barbershop.Models.ResponseDTOs
{
    public class AppointmentServiceDTO
    {
        public int AppointmentServiceId { get; set; }
        public int AppointmentId { get; set; }
        public int ServiceId { get; set; }
        public decimal Price { get; set; }
    }
}
