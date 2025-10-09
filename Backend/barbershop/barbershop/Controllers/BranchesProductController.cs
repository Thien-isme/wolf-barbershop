using barbershop.Services.implements;
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

    }
}
