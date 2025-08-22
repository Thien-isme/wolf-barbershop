using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [Route("api/[Controller]")]
    public class ProductController : Controller
    {
        private readonly ProductService productService;
        public ProductController()
        {
            productService = new ProductService();
        }


        [HttpGet("products")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await productService.GetProductByIdAsync(id);
            return Ok(product);
        }
    } 
}
