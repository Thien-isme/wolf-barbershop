using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class CartDTO
    {
        public long CartId { get; set; }

        public long? UserId { get; set; }

        public int? ProductId { get; set; }

        public bool? IsAvailable { get; set; }

        public ProductDTO? ProductDTO { get; set; }

    }
}
