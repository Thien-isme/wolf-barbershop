namespace barbershop.Models.RequestDTOs
{
    public class PlusOrSubQuantityProductInCartRequest
    {
        public int CartId { get; set; }
        public int Quantity { get; set; }
    }
}
