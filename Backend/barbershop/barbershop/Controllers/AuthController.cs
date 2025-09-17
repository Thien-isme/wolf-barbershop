using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;
using barbershop.Models.RequestDTOs;
namespace barbershop.Controllers
{
    public class AuthController : Controller
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("api/AuthController/google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            // request.Token là token từ FE
            var userInfo = await _authService.LoginWithGoogleAsync(request.Token);
            if (userInfo != null)
                return Ok(userInfo);
            return Unauthorized();
        }
    }
}
