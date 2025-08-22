namespace barbershop.Models.ResponseDTOs
{
    public class BaseResponse
    {
        public string? Status { get; set; }
        public string? Message { get; set; }
        public object? Data { get; set; }
    }
}
