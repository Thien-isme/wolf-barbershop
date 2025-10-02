namespace barbershop.Models.ResponseDTOs
{
    public class LoginResponse
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public UserDTO UserDTO { get; set; }

    }
}
