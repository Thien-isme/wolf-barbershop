using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class BrandDTO
    {
        public int BrandId { get; set; }

        public string BrandName { get; set; } = null!;

        public string? Description { get; set; }

        public string? LogoPath { get; set; }

        public bool? IsActive { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public List<ProductDTO>? ProductDTO { get; set; } = new List<ProductDTO>();
    }
}
