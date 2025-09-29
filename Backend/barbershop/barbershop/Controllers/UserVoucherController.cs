using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace barbershop.Controllers
{
    [Route("api/[controller]")]
    public class UserVoucherController : Controller
    {
        private readonly UserVoucherService userVoucherService;
        private readonly TokenService _tokenService = new TokenService();
        public UserVoucherController()
        {
            userVoucherService = new UserVoucherService();
        }

        [HttpGet("get-vouchers-of-user")]
        [Authorize(Policy = "User")]
        public async Task<IActionResult> GetVouchersOfUser()
        {
            // Lấy token từ header Authorization
            var authHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                return Unauthorized();

            var accessToken = authHeader.Substring("Bearer ".Length).Trim();

            var checkToken = await _tokenService.ValidateAccessToken(accessToken);
            if(checkToken.IsValid == false)
            {
                return Unauthorized();
            }
            var decode = await _tokenService.DecodeToken(accessToken);
            var response = await userVoucherService.GetVouchersOfUser(decode.UserId);
            return Ok(response);
        }
    }
}
