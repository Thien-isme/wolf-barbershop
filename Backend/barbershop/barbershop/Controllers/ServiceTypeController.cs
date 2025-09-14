using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceTypeController : ControllerBase
    {
    private readonly ServiceTypeService serviceTypeService = new ServiceTypeService();
        // TODO: Implement API methods

        [HttpGet("GetAllTypeServices")]
        public async Task<IActionResult> GetAllTypeServices()
        {
            var response = await serviceTypeService.GetAllTypeServices();
            return Ok(response);
        }




    }
}
