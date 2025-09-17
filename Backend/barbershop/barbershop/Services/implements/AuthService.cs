using barbershop.Helpers;
using barbershop.Models.Entitys;
using barbershop.Models.ResponseDTOs;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace barbershop.Services.implements
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;
        private readonly UserService userService = new UserService();

        public AuthService()
        {
        }

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<BaseResponse> LoginWithGoogleAsync(string token)
        {
            var response = new BaseResponse();
            try
            {
                // 1. Decode và xác thực Google token
                var payload = await GoogleJsonWebSignature.ValidateAsync(token);

                // 2. Kiểm tra email trong DB
                var user = await userService.FindByEmail(payload.Email); // Nếu dùng email làm phone, hoặc tạo FindByEmail
                if (user == null)
                {
                    // 3. Nếu chưa có, tạo mới user
                    user = new User
                    {
                        FullName = payload.Name,
                        Email = payload.Email,
                        //AvatarUrl = payload.Picture,
                    };
                    user = await userService.AddUser(user);
                }

                // Đọc cấu hình JWT
                var secretKey = _configuration["Jwt:SecretKey"];
                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];
                var expireDays = int.Parse(_configuration["Jwt:ExpireDays"] ?? "7");

                // 4. Tạo JWT token cho user
                var jwtToken = JwtHelper.GenerateJwtToken(user, secretKey, issuer, audience, expireDays);

                // 5. Trả về token cho FE
                response.Status = 200;
                response.MessageShow = "Đăng nhập Google thành công";
                response.Data = new { token = jwtToken, user };
            }
            catch (Exception ex)
            {
                response.Status = 401;
                response.MessageShow = "Token Google không hợp lệ";
                response.MessageHide = ex.Message;
                response.Data = null;
            }
            return response;
        }
    }
}
