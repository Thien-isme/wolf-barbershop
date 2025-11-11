using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class BranchesProductDTO
    {
        public int BranchesProductsId { get; set; }

        public int? BranchId { get; set; }

        public int? ProductId { get; set; }

        public int? Quantity { get; set; }

        public int? SizeId { get; set; }
        public bool? IsActive { get; set; }

        public DateTime? UpdateAt { get; set; }

        public  BranchDTO? BranchDTO { get; set; }

        public  ProductDTO? ProductDTO { get; set; }

        public  SizeDTO? SizeDTO { get; set; }

    }
}
