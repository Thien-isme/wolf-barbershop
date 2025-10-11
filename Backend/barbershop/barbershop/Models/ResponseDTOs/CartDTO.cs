using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class CartDTO
    {
        public long CartId { get; set; }

        public long? UserId { get; set; }

        public int? ProductId { get; set; }

        public int? SizeId { get; set; }
        public string? SizeName { get; set; } // Thêm thuộc tính SizeName
        public int? Quantity { get; set; }

        public bool? IsAvailable { get; set; }

        public  ProductDTO? ProductDTO { get; set; }
        public  ProductPriceDTO? ProductPriceDTO { get; set; } // Thêm thuộc tính ProductPriceDTO
        public  SizeDTO? SizeDTO { get; set; }

        public UserDTO? UserDTO { get; set; }

    }
}
