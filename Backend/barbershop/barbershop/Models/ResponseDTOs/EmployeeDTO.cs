using System;

namespace barbershop.Models.ResponseDTOs
{
    public class EmployeeDTO
    {
        public int? EmployeeId { get; set; }
        public long? UserId { get; set; }
        public string? FullName { get; set; }
        public int? BranchId { get; set; }
        public int? ExperienceYears { get; set; }
        public decimal? Rating { get; set; }
        public int? QuantityRate { get; set; }
        public bool IsActive { get; set;    }
        public string? AvatarUrl { get; set; }
        public int? EmployeeRoleId { get; set; }
        public string? NickName { get; set; }
        public string? LocationDetail { get; set; }
        public UserDTO? UserDTO { get; set; }
    }
}
