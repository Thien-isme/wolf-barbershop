namespace barbershop.Models.RequestDTOs
{
    public class PlusOrSubQuantityProductRequest
    {
        public int ProductId { get; set; }
        public int? SizeId { get; set; }
        public int Quantity { get; set; }
    }
}
