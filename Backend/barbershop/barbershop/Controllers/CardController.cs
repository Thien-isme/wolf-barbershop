using Azure.Core;
using barbershop.Models.RequestDTOs;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace barbershop.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[Controller]")]
    public class CardController : ControllerBase
    {
        private readonly CartService _cartService;
        public CardController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("SaveToCart")]
        public async Task<IActionResult> saveToCart(SaveToCartRequest saveToCartRequest)
        {
            var userId = Request.Headers["Userid"].FirstOrDefault();
            Console.WriteLine("userId: " + userId);
            var response = await _cartService.SaveToCart(saveToCartRequest, userId);
            return Ok(response);

        }


    }
}
