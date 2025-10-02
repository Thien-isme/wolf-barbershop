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
        //private readonly IConfiguration _configuration;
        private readonly UserService userService = new UserService();
        private readonly TokenService tokenService;

        private readonly UserRepository userRepository = new UserRepository();
        

        public AuthService(TokenService tokenService)
        {
            this.tokenService = tokenService;
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

                // 4. Tạo JWT token cho
                var accessToken = tokenService.GenerateAccessToken(user);
                var refreshToken = tokenService.GenerateRefreshToken(user);
                // 5. Trả về token cho FE
                BaseResponse baseResponse = new BaseResponse();
                baseResponse.Status = 200;
                baseResponse.MessageShow = "Đăng nhập thành công";
                baseResponse.Data = new LoginResponse
                {
                    AccessToken = accessToken.Result,
                    RefreshToken = refreshToken.Result,
                    UserDTO = new UserDTO
                    {
                        UserId = user.UserId,
                        FullName = user.FullName,
                        Email = user.Email,
                        Phone = user.Phone,
                        RoleId = user.RoleId,
                        AvatarUrl = user.AvatarUrl
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

            var accessToken = await tokenService.GenerateAccessToken(user);


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
                var user = await userRepository.FindByUsername(request.Username);
                if (user == null)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Tên đăng nhập không tồn tại",
                        Data = null
                    };
                }

                if (user.Username != request.Username)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Tên đăng nhập không đúng",
                        Data = null
                    };
                }

                if (user.Password != request.Password)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Mật khẩu không đúng",
                        Data = null
                    };
                }

                // 4. Tạo JWT token cho
                var accessToken = tokenService.GenerateAccessToken(user);
                var refreshToken = tokenService.GenerateRefreshToken(user);
                // 5. Trả về token cho FE
                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Đăng nhập thành công",
                    Data = new LoginResponse
                    {
                        AccessToken = accessToken.Result,
                        RefreshToken = refreshToken.Result,
                        UserDTO = new UserDTO
                        {
                            UserId = user.UserId,
                            FullName = user.FullName,
                            Email = user.Email,
                            Phone = user.Phone,
                            RoleId = user.RoleId,
                            AvatarUrl = user.AvatarUrl
                        }
                    },
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