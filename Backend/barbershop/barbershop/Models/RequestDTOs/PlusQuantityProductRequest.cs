namespace barbershop.Models.RequestDTOs
{
    public class PlusQuantityProductRequest
    {
        public int ProductId { get; set; }
        public int? SizeId { get; set; }
        public int Quantity { get; set; }
    }
}
