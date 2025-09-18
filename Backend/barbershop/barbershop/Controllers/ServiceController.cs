using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {
    private readonly ServiceService serviceService = new ServiceService();
        // TODO: Implement API methods
        [HttpGet("GetAllServices")]
        public async Task<IActionResult> GetAllServices()
        {
             // Placeholder for actual service call
             var response = await serviceService.GetAllServices();
             return Ok(response);
        }
    }
}
