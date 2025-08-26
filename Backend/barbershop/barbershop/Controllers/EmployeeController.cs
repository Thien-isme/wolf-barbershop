using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService employeeService = new EmployeeService();
        // TODO: Implement API methods
    
        [HttpGet("GetBarbers")]
        public async Task<IActionResult> GetAllBarbers()
        {
            var barbers = await employeeService.GetAllBarbers();
            return Ok(barbers);
        }


    }
}
