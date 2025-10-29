namespace barbershop.Models.RequestDTOs
{
    public class CreateInvoiceNoBookingRequest
    {
        public int BarberId { get; set; }
        public string? CustomerPhone { get; set; }
        public string? CustomerName { get; set; }
        public bool? IsNewCustomer { get; set; }
        public int? PaymentMethodId { get; set; }
        //public long CustomerId { get; set; }
        public List<int> ServiceIds { get; set; } = new List<int>();
        public List<ProductInvoiceRequest> Products { get; set; } = new List<ProductInvoiceRequest>();
        //public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
    }
}
