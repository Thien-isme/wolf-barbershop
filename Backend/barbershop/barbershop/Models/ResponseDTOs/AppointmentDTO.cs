using barbershop.Models.Entitys;
using System;

namespace barbershop.Models.ResponseDTOs
{
    public class AppointmentDTO
    {
        public long AppointmentId { get; set; }

        public long UserId { get; set; }

        public int BarberId { get; set; }

        public int BranchId { get; set; }

        public DateOnly? AppointmentDate { get; set; }

        public TimeOnly? AppointmentTime { get; set; }

        public string Status { get; set; } = null!;

        public DateTime? CreatedAt { get; set; }

        public string? Note { get; set; }

        public bool? IsActive { get; set; }

        public List<AppointmentServiceDTO>? AppointmentServiceDTO { get; set; } = new List<AppointmentServiceDTO>();

        public  EmployeeDTO? EmployeeDTO { get; set; } = null!;

        public  BranchDTO? BranchDTO { get; set; } = null!;

        public List<PaymentDTO>? PaymentDTO { get; set; } = new List<PaymentDTO>();

        public List<ReviewDTO>? ReviewDTO { get; set; } = new List<ReviewDTO>();

        public UserDTO? UserDTO { get; set; } = null!;

        //Thêm 
        public List<ServiceDTO>? ServiceDTOs { get; set; }
    }
}
