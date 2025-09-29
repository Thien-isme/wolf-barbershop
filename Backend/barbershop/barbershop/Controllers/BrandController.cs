using Microsoft.AspNetCore.Mvc;
using barbershop.Services.implements;
namespace barbershop.Controllers
{
    public class BrandController : Controller
    {
        private readonly BrandService _brandService;
        public BrandController()
        {
            _brandService = new BrandService();
        }


        [HttpGet("api/[Controller]/getAllBrands")]
        public async Task<IActionResult> GetAllBrands()
        {
            var brands = await _brandService.GetAllBrands();
            return Ok(brands);
        }
    }
}
