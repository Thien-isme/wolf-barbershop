using barbershop.Models.Entitys;
using System;

namespace barbershop.Models.ResponseDTOs
{
    public class ServiceDTO
    {
        public int ServiceId { get; set; }

        public string ServiceName { get; set; } = null!;

        public int ServiceTypeId { get; set; }

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public int DurationMin { get; set; }

        public bool IsActive { get; set; }

        public string? ServiceImage { get; set; }

        public bool? IsOutstanding { get; set; }
        public List<AppointmentServiceDTO> AppointmentServicesDTO { get; set; } = null!;
        public List<PaymentServicesDTO> PaymentServicesDTO { get; set; } = null!;

        public List<ServiceTypeDTO> ServiceTypeDTO { get; set; } = null!;
    }
}
