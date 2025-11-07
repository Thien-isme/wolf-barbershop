namespace barbershop.Models.ResponseDTOs
{
    public class SizeDTO
    {
        public int? SizeId { get; set; }
        public string? SizeName { get; set; } = null!;

        public DateTime? CreatedAt { get; set; }

        public bool? IsActive { get; set; }
    }
}
