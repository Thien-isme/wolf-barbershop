using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public int ProductTypeId { get; set; }
        public string? Instruction { get; set; }
        public bool? IsActive { get; set; }
        public int? SizeId { get; set; }
        public string? ProductImg { get; set; }
        public int? BrandId { get; set; }
        public bool? IsOutstanding { get; set; }
        public Brand? Brand { get; set; }
        public List<PaymentServicesDTO> PaymentServicesDTO { get; set; } = new List<PaymentServicesDTO>();
        public List<ProductPriceDTO> ProductPriceDTO { get; set; } = new List<ProductPriceDTO>();
        public List<ProductSizesDTO> ProductSizesDTO { get; set; } = new List<ProductSizesDTO>();
        public ProductType ProductType { get; set; } = null!;
        public Size? Size { get; set; }
    }
}
