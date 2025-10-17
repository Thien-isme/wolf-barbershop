namespace barbershop.Models.RequestDTOs
{
    public class CreateInvoiceRequest
    {
        public long AppointmentId { get; set; }
        public long CustomerId { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public List<int> ServiceIds { get; set; } = new List<int>();
        public List<ProductInvoiceRequest> Products { get; set; } = new List<ProductInvoiceRequest>();
        public int? PaymentMethodId { get; set; }
    }
}
