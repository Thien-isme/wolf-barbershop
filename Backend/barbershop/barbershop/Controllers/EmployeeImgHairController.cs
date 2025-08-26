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
    }
}
