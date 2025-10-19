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


        [HttpGet("getAllProductsToManagement")]
        public async Task<IActionResult> GetAllProductsToManagementAsync()
        {
            var products = await productService.GetAllProductsToManagementAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await productService.GetProductByIdAsync(id);
            return Ok(product);
        }

        [HttpGet("getAllProductsForSale")]
        public async Task<IActionResult> GetAllProductsForSaleAsync()
        {
            var product = await productService.GetAllProductsForSaleAsync();
            return Ok(product);
        }



        [HttpGet("getAllProductsIsOutStanding")]
        public async Task<IActionResult> GetAllProductsIsOutStanding()
        {
            var products = await productService.GetAllProductsIsOutStandingAsync();
            return Ok(products);
        }

        
    } 
}
