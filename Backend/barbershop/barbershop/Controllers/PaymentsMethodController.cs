using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsMethodController : ControllerBase
    {
    private readonly PaymentsMethodService paymentsMethodService = new PaymentsMethodService();

        [HttpGet("GetPaymentsMethods")]
        public async Task<IActionResult> GetPaymentsMethods()
        {
            var response = await paymentsMethodService.GetPaymentsMethods();
            return Ok(response);
        }


    }
}
