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

        public ProductTypeController()
        {
            productTypeService = new ProductTypeService();
        }

        [HttpGet("GetAllProductType")]
        public async Task<IActionResult> GetAllProductType()
        {
            var response = await productTypeService.GetAllProductType();
            return Ok(response);
        }









    }
}
