namespace barbershop.Models.RequestDTOs
{
    public class CreateInvoiceRequest
    {
        public long AppointmentId { get; set; }
        public List<int> ServiceIds { get; set; } = new List<int>();
        public List<int> ProductIds { get; set; } = new List<int>();
        public int? PaymentMethodId { get; set; }
    }
}
