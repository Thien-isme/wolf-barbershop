using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductTypeController : ControllerBase
    {
    private readonly ProductTypeService productTypeService = new ProductTypeService();
    // TODO: Implement API methods
    }
}
