using barbershop.Models.RequestDTOs;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly TokenService _tokenService;
        private readonly UserService _userService = new UserService();
        public AuthController(AuthService authService, TokenService tokenService)
        {
            _authService = authService;
            _tokenService = tokenService;
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            // request.Token là token từ FE
            var userInfo = await _authService.LoginWithGoogleAsync(request.Token);
            if (userInfo != null)
                return Ok(userInfo);
            return Unauthorized();
        }

        [HttpPost("auto-login")]
        [Authorize]
        public async Task<IActionResult> AutoLogin([FromBody] AutoLoginDTO request)
        {
            Console.WriteLine("AutoLogin called");
            Console.WriteLine("RefreshToken from body: " + request.refreshToken);
            // Lấy token từ header Authorization
            var authHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                return Unauthorized();

            var accessToken = authHeader.Substring("Bearer ".Length).Trim();

            var checkToken = await _tokenService.ValidateAccessToken(accessToken);
            Console.WriteLine("Access token validation: " + checkToken.IsValid + " - " + checkToken.Reason);
            if (checkToken.IsValid == false && checkToken.Reason.Equals("AccessToken not found"))
            {
                Console.WriteLine("Access token not found");
                return Unauthorized();
            }

            if (checkToken.IsValid == false && checkToken.Reason.Equals("AccessToken revoked"))
            {
                Console.WriteLine("Access token revoked");
                return Unauthorized();
            }

            if (checkToken.IsValid == false && checkToken.Reason.Equals("AccessToken expired"))
            {
                Console.WriteLine("Access token expired");
                // Nếu token hết hạn, kiểm tra refresh token
                var refreshCheck = await _tokenService.ValidateRefreshToken(request.refreshToken);
                Console.WriteLine("RefreshToken: " + request.refreshToken);
                if (refreshCheck.IsValid == false)
                {
                    Console.WriteLine("Refresh token invalid: " + refreshCheck.Reason);
                    return Unauthorized();
                }
                // Tạo mới access token
                Console.WriteLine("Refresh token valid");
                //Console.WriteLine("Refresh token: "+refreshToken);
                var decode = await _tokenService.DecodeToken(request.refreshToken);
                if (decode == null)
                {
                    Console.WriteLine("Decode refresh token failed");
                    return Unauthorized();
                }
                Console.WriteLine("Decode refresh token UserId: " + decode.UserId);
                var user = await _userService.FindById(decode.UserId);
                if (user == null)
                    return Unauthorized();
                var secretKey = "lai_19_thanh_05_nhat_2_thien_004_@hehehe"; // Đọc từ cấu hình
                var issuer = "barbershop-api"; // Đọc từ cấu hình
                var audience = "barbershop-client"; // Đọc từ cấu hình
                var expireDays = 1; // Đọc từ cấu hình

                accessToken = await _tokenService.GenerateAccessToken(user);
            }

            var userInfo = await _authService.AutoLogin(accessToken);
            return Ok(userInfo);
        }

        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var newTokens = await _authService.RefreshTokenAsync(request.RefreshToken);
            if (newTokens != null)
                return Ok(newTokens);
            return Unauthorized();
        }

        [HttpPost("login-username-password")]
        public async Task<IActionResult> LoginWithUsernameAndPassword([FromBody] LoginWithUsernameAndPassword request)
        {
            var res = await _authService.LoginWithUsernameAndPassword(request);
            if (res != null)
                return Ok(res);
            return Unauthorized();
        }

    }
}