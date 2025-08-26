using System;

namespace barbershop.Models.ResponseDTOs
{
    public class AppointmentDTO
    {
        public int AppointmentId { get; set; }
        public int UserId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Status { get; set; }
    }
}
