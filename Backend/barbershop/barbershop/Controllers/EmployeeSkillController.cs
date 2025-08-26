using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeSkillController : ControllerBase
    {
    private readonly EmployeeSkillService employeeSkillService = new EmployeeSkillService();
    // TODO: Implement API methods
    }
}
