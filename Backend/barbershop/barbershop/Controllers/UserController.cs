using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
    private readonly UserService userService = new UserService();
    // TODO: Implement API methods

        [HttpGet("GetUsersToCreateInvoice")]
        public async Task<IActionResult> GetUsersToCreateInvoice()
        {
            try
            {
                var users = await userService.GetUsersToCreateInvoice();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
