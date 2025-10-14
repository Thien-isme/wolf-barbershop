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

    }
}
