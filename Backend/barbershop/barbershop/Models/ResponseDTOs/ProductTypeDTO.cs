using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class ProductTypeDTO
    {
        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; } = null!;
        public List<ProductDTO> Products { get; set; } = new List<ProductDTO>();
    }
}
