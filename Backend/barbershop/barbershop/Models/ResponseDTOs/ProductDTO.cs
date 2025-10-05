using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int? ProductTypeId { get; set; }
        public string? Instruction { get; set; }
        public bool? IsActive { get; set; }
        public int? SizeId { get; set; }
        public string? ProductImg { get; set; }
        public int? BrandId { get; set; }
        public bool? IsOutstanding { get; set; }
        public Brand? Brand { get; set; }
        public ProductPriceDTO? ProductPriceDTO { get; set; }
        public ProductType? ProductType { get; set; }
        public List<SizeDTO>? SizeDTOs { get; set; }
    }
}
