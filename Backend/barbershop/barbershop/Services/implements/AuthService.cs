using Azure;
using Azure.Core;
using barbershop.Helpers;
using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;
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
        private readonly TokenService tokenService = new TokenService();

        private readonly UserRepository userRepository = new UserRepository();
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
                Console.WriteLine("Google payload: " + payload.Email);
                //// 2. Kiểm tra email trong DB
                var user = await userService.FindByEmail(payload.Email); // Nếu dùng email làm phone, hoặc tạo FindByEmail
                if (user == null)
                {
                    // 3. Nếu chưa có, tạo mới user
                    user = new User
                    {
                        FullName = payload.Name,
                        Email = payload.Email,
                        AvatarUrl = payload.Picture,
                        RoleId = 1, // Mặc định role user
                        CreateAt = DateTime.Now,
                        IsActive = true
                    };

                    user = await userService.AddUser(user);
                }


                // Đọc cấu hình JWT
                var secretKey = _configuration["Jwt:SecretKey"];
                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];
                var expireDays = int.Parse(_configuration["Jwt:ExpireMinutes"] ?? "7");

                // 4. Tạo JWT token cho
                var accessToken = tokenService.GenerateAccessToken(user, secretKey, issuer, audience, expireDays);
                var refreshToken = tokenService.GenerateRefreshToken(user, secretKey, issuer, audience, expireDays + 1);
                // 5. Trả về token cho FE
                BaseResponse baseResponse = new BaseResponse();
                baseResponse.Status = 200;
                baseResponse.MessageShow = "Đăng nhập thành công";
                baseResponse.Data = new LoginResponse { AccessToken = accessToken.Result, RefreshToken = refreshToken.Result, UserDTO = new UserDTO
                {
                    Email = user.Email,
                }
                };

                return baseResponse;
            }
            catch (Exception ex)
            {
                response.Status = 401;
                response.MessageShow = "Token Google không hợp lệ";
                response.MessageHide = ex.InnerException?.Message ?? ex.Message;
                response.Data = null;
            }
            return response;
        }

        public async Task<BaseResponse> AutoLogin(string token)
        {
            var info = tokenService.DecodeToken(token);

            var user = await userService.FindById(info.Result.UserId);
            var accessToken = tokenService.GetLatestAccessTokenByUserId(user.UserId);
            var refreshToken = tokenService.GetLatestRefreshTokenByUserId(user.UserId);

            return new BaseResponse
            {
                Status = 200,
                MessageShow = "Tự động đăng nhập thành công",
                Data = new { accessToken = accessToken, refreshToken = refreshToken, user }
            };
        }

        public async Task<BaseResponse?> RefreshTokenAsync(string refreshToken)
        {
            var validationResult = await tokenService.ValidateRefreshToken(refreshToken);
            Console.WriteLine("Refresh token validation: " + validationResult.IsValid + " - " + validationResult.Reason);
            if (validationResult.IsValid == false)
            {
                return new BaseResponse
                {
                    Status = 401,
                    MessageShow = "Refresh token không hợp lệ: " + validationResult.Reason,
                    Data = null
                };
            }

            var info = await tokenService.DecodeToken(refreshToken);
            var UserId = info.UserId;
            var Email = info.Email;
            var FullName = info.FullName;
            var RoleId = info.RoleId;

            User user = new User
            {
                UserId = UserId,
                Email = Email,
                FullName = FullName,
                RoleId = RoleId
            };

            var accessToken = await tokenService.GenerateAccessToken(user, _configuration["Jwt:SecretKey"], _configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], int.Parse(_configuration["Jwt:ExpireMinutes"] ?? "7"));


            return new BaseResponse
            {
                Status = 200,
                MessageShow = "Làm mới token thành công",
                Data = accessToken
            };
        }

        public async Task<BaseResponse?> LoginWithUsernameAndPassword(LoginWithUsernameAndPassword request)
        {
            try
            {
                var usernameCheck = await userRepository.FindByUsername(request.Username);
                if (usernameCheck == null)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Tên đăng nhập không tồn tại",
                        Data = null
                    };
                }

                var passwordCheck = await userRepository.FindByUsernameAndPassword(request.Username, request.Password);
                if (passwordCheck == null)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Mật khẩu không đúng",
                        Data = null
                    };
                }

                // Đọc cấu hình JWT
                var secretKey = _configuration["Jwt:SecretKey"];
                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];
                var expireDays = int.Parse(_configuration["Jwt:ExpireMinutes"] ?? "7");

                // 4. Tạo JWT token cho
                var accessToken = tokenService.GenerateAccessToken(passwordCheck, secretKey, issuer, audience, expireDays);
                var refreshToken = tokenService.GenerateRefreshToken(passwordCheck, secretKey, issuer, audience, expireDays + 1);
                // 5. Trả về token cho FE
                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Đăng nhập thành công",
                    Data = new { accessToken = accessToken.Result, refreshToken = refreshToken.Result, passwordCheck },
                };
            }
            catch
            {
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!",
                    Data = null
                };
            }
        }
    }
}
