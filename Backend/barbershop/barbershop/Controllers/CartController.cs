﻿using Azure.Core;
using barbershop.Models.RequestDTOs;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace barbershop.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[Controller]")]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;
        public CartController(CartService cartService)
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

        [HttpGet("GetProductInCartsOfUser")]
        public async Task<IActionResult> GetProductInCarts()
        {
            var userId = Request.Headers["Userid"].FirstOrDefault();
            Console.WriteLine("userId: " + userId);
            var response = await _cartService.GetProductInCartsOfUser(userId);
            return Ok(response);
        }


        [HttpGet("CountProductInCart")]
        public async Task<IActionResult> CountProductInCart()
        {
            var userId = Request.Headers["Userid"].FirstOrDefault();
            Console.WriteLine("userId: " + userId);
            var response = await _cartService.CountProductInCart(userId);
            return Ok(response);
        }
    }
}
