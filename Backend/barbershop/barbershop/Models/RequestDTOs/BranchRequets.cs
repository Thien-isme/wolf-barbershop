namespace barbershop.Models.RequestDTOs
{
    public class BranchRequets
    {
        public string BranchName { get; set; }
        public string ProvinceCity { get; set; }
        public string WardCommune { get; set; }
        public string? LocationDetail { get; set; }
        public string? BranchUrl { get; set; }
        public TimeOnly? TimeOn { get; set; }
        public TimeOnly? TimeOff { get; set; }
        public IFormFile? BranchImage { get; set; }
    }
}
