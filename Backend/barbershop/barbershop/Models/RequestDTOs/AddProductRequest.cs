namespace barbershop.Models.RequestDTOs
{
    public class AddProductRequest
    {
        public string ProductName { get; set; }
        public int? BrandId { get; set; }
        public int? ProductTypeId { get; set; }
        public decimal? OriginalPrice { get; set; }
        public bool HasDiscount { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public DateTime? DiscountStartDate { get; set; }
        public DateTime? DiscountEndDate { get; set; }
        public bool? HasSize { get; set; }
        public List<int>? SizeIds { get; set; }
        public List<IFormFile> Images { get; set; }
    }
}
