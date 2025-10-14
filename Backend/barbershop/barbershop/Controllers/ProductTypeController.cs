using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
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

        //[Authorize]
        //[HttpGet("getAllProductTypeInBranchOfCashier")]
        //public async Task<IActionResult> getAllProductTypeInBranchOfCashier()
        //{
        //    var userId = Request.Headers["Userid"].ToString();
        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        return BadRequest(new { Status = 400, MessageShow = "UserId header is missing", MessageHide = "UserId header is missing", Data = (object?)null });
        //    }
        //    var response = await productTypeService.getAllProductTypeInBranchOfCashier(int.Parse(userId));
        //    return Ok(response);
        //}






    }
}
