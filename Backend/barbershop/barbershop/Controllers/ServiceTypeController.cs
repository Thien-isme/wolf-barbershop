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

        [HttpGet("GetAllServiceTypes")]
        public async Task<IActionResult> GetAllServiceTypes()
        {
            var response = await serviceTypeService.GetAllServiceTypes();
            return Ok(response);
        }




    }
}
