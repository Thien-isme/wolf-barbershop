using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeImgHairController : ControllerBase
    {
    private readonly EmployeeImgHairService employeeImgHairService = new EmployeeImgHairService();
        // TODO: Implement API methods

        [HttpGet("GetAllByEmployeeId")]
        public async Task<IActionResult> GetAllByEmployeeId(int employeeId)
        {
             var response = await employeeImgHairService.GetAllByEmployeeId(employeeId);
             return Ok(response);
        }

        [HttpGet("GetHairIsOutstanding")]
        public async Task<IActionResult> GetHairIsOutstanding()
        {
             var response = await employeeImgHairService.GetHairIsOutstanding();
             return Ok(response);
        }





    }
}
