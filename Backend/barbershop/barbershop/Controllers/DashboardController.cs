using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [Controller]
    [Route("dashboard")]
    public class DashboardController : Controller
    {
       private readonly DashboardService _dashboardService;

       public DashboardController(DashboardService dashboardService)
       {
           _dashboardService = dashboardService;
       }

        [HttpGet("getInfoDashboard")]
        public async Task<IActionResult> GetInfoDashboard()
        {
            var cashierId = Request.Headers["UserId"].FirstOrDefault();
            if (cashierId == null)
            {
                return BadRequest("UserId header is missing.");
            }
            var info = await _dashboardService.GetInfoAsync(int.Parse(cashierId));
            return Ok(info);
        }

    }
}
