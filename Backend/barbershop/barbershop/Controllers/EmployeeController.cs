using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
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
