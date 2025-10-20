using barbershop.Models.RequestDTOs;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BranchesProductController : Controller
    {
        private readonly BranchesProductService branchesProductService = new BranchesProductService();

        

        // using when cashier sale product
        [Authorize]
        [HttpGet("getAllProductTypeInBranchOfCashier")]
        public async Task<IActionResult> getAllProductTypeInBranchOfCashier()
        {
            var userId = Request.Headers["Userid"].ToString();
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { Status = 400, MessageShow = "UserId header is missing", MessageHide = "UserId header is missing", Data = (object?)null });
            }
            var response = await branchesProductService.getAllProductTypeInBranchOfCashier(int.Parse(userId));
            return Ok(response);
        }

        [Authorize]
        // using for management
        [HttpGet("GetAllProductInBranch")]
        public async Task<IActionResult> GetAllProductInBranch()
        {
            var userId = Request.Headers["Userid"].FirstOrDefault();

            if (userId == null)
            {
                return BadRequest(string.Empty);
            }

            var response = await branchesProductService.GetAllProductInBranch(int.Parse(userId));
            return Ok(response);
        }

        // using for management
        // Tăng số lượng sản phẩm trong kho
        [Authorize]
        [HttpPost("PlusQuantityProduct")]
        public async Task<IActionResult> PlusQuantityProduct(PlusOrSubQuantityProductRequest plusQuantityProductRequest)
        {
            var userId = Request.Headers["Userid"].FirstOrDefault();

            if (userId == null)
            {
                return BadRequest(string.Empty);
            }

            var response = await branchesProductService.PlusQuantityProduct(plusQuantityProductRequest, int.Parse(userId));
            return Ok(response);
        }


        // using for management
        // Giảm số lượng sản phẩm trong kho
        [Authorize]
        [HttpPost("SubQuantityProduct")]
        public async Task<IActionResult> SubQuantityProduct(PlusOrSubQuantityProductRequest plusQuantityProductRequest)
        {
            var userId = Request.Headers["Userid"].FirstOrDefault();

            if (userId == null)
            {
                return BadRequest(string.Empty);
            }

            var response = await branchesProductService.PlusQuantityProduct(plusQuantityProductRequest, int.Parse(userId));
            return Ok(response);
        }


    }
}
