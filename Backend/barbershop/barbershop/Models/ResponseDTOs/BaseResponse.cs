namespace barbershop.Models.ResponseDTOs
{
    public class BaseResponse
    {
        public int? Status { get; set; }
        public string? MessageShow { get; set; } = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!";

        public string? MessageHide { get; set; } = "None";
        public object? Data { get; set; }
    }
}
