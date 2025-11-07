using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [Route("api/[Controller]")]

    public class SizeController : Controller
    {
        private readonly SizeService sizeService;
        public SizeController()
        {
            sizeService = new SizeService();
        }


        [HttpGet("sizes")]
        public async Task<IActionResult> GetAllSizesAsync()
        {
            var sizes = await sizeService.GetAllSizesAsync();
            return Ok(sizes);
        }

    }
}
