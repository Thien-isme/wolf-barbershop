namespace barbershop.Models.ResponseDTOs
{
    public class DecodeToken
    {
        public long UserId { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public int RoleId { get; set; }
    }
}
