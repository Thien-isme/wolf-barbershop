using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService employeeService = new EmployeeService();
        private readonly TokenService tokenService = new TokenService();
        // TODO: Implement API methods

        [HttpGet("GetBarbers")]
        [Authorize(Policy = "Manager")]
        public async Task<IActionResult> GetAllBarbers()
        {
            var authHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            Console.WriteLine("Authorization Header: " + authHeader);
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();
                // Sử dụng token ở đây
                var decode = await tokenService.ValidateAccessToken(token);
                Console.WriteLine("Token hợp lệ: " + decode.IsValid);
                if (!decode.IsValid)
                {
                    Console.WriteLine("Token không hợp lệ: " + decode.Reason);
                }
            }
            var barbers = await employeeService.GetAllBarbers();
            return Ok(barbers);
        }

        [HttpGet("GetBarbersInBranch")]
        public async Task<IActionResult> GetBarbersInBranch(int branchId)
        {
            
            var barbers = await employeeService.GetBarbersInBranch(branchId);
            return Ok(barbers);
        }

        [HttpPost("AddBarber")]
        public async Task<IActionResult> AddBarber([FromForm] AddBarberRequest request)
        {
            var response = await employeeService.AddBarber(request, request.Avatar);
            return Ok(response);
        }


    }
}
