using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class ProductDTO
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public int ProductTypeId { get; set; }

        public List<ProductPriceDTO> ProductPriceDTO { get; set; }

        public int Discount { get; set; }

        public string? Instruction { get; set; }

        public string? ProductTypeName { get; set; }

        public bool? isActive { get; set; }


        //public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();

        //public virtual ICollection<PaymentService> PaymentServices { get; set; } = new List<PaymentService>();
    }
}
