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
        public List<InventoryDTO> Inventories { get; set; } = new();
        public List<PaymentServiceDTO> PaymentServices { get; set; } = new();
        public List<ProductPriceDTO> ProductPriceDTO { get; set; } = new();
        public string? ProductTypeName { get; set; }
        public string? SizeName { get; set; }
    }
}
