namespace barbershop.Models.RequestDTOs
{
    public class AddBarberRequest
    {
            public string? FullName { get; set; }
            public string? Phone { get; set; }
            public DateOnly? Dob { get; set; } // hoặc DateTime nếu bạn muốn parse ngày tháng
            public string? CCCD { get; set; }
            public int? ExperienceYears { get; set; }
            public string? Username { get; set; }
            public string? Email { get; set; }
            public string? Password { get; set; }
            public int? BranchId { get; set; }
            public IFormFile? Avatar { get; set; }
    }
}
