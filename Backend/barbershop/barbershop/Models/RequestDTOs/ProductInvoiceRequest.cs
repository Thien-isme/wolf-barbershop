namespace barbershop.Models.RequestDTOs
{
    public class ProductInvoiceRequest
    {
        public int ProductId { get; set; }
        public int SizeId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
