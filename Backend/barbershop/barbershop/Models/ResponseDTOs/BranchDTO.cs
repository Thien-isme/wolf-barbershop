namespace barbershop.Models.ResponseDTOs
{
    public class BranchDTO
    {
        public int BranchId { get; set; }
        public string BranchName { get; set; } = null!;
        public string ProvinceCity { get; set; } = null!;
        public string WardCommune { get; set; } = null!;
        public string? LocationDetail { get; set; }
        public bool IsActive { get; set; }
        public string? BranchUrl { get; set; }
        public TimeOnly? TimeOn { get; set; }
        public TimeOnly? TimeOff { get; set; }

        public int Barbers { get; set; } = 0;
    }
}