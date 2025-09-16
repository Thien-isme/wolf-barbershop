using barbershop.Models.Entitys;

namespace barbershop.Models.RequestDTOs
{
    public class AppointmentRequest
    {
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        //public long UserId { get; set; }
        public int BarberId { get; set; }
        public int BranchId { get; set; }

        public List<int>? servicesId { get; set; } = new List<int>();

        public DateTime? AppointmentDate { get; set; }
        public TimeOnly? AppointmentTime { get; set; }

        public int? VoucherId { get; set; }
        public string? Note { get; set; }


    }
}
