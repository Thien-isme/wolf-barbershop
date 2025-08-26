using System;
using barbershop.Models.ResponseDTOs;

namespace barbershop.Models.BarberDTO
{
    public class BarberDTO
    {
        public int BarberId { get; set; }
        public int UserId { get; set; }
        public int BranchId { get; set; }
        public DateOnly? ExperienceYears { get; set; }
        public decimal? Rate { get; set; }
        public string? AvatarUrl { get; set; }
        public bool IsActive { get; set; }
    }
}
