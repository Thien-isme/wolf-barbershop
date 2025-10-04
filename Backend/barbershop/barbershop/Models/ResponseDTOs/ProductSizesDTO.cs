using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class ProductSizesDTO
    {
        public int ProductSizeId { get; set; }

        public int ProductId { get; set; }

        public int? SizeId { get; set; }

        public virtual List<InventoryDTO> Inventories { get; set; } = new List<InventoryDTO>();

        public virtual Product Product { get; set; } = null!;

        public virtual Size? Size { get; set; }
    }
}
