using barbershop.Models.RequestDTOs;
using barbershop.Models.ResponseDTOs;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BranchController : ControllerBase
    {
        private readonly BranchService branchService = new BranchService();

        [HttpPost("add")]
        public async Task<IActionResult> AddBranch([FromForm] BranchRequets form)
        {
            var request = new BranchRequets
            {
                BranchName = form.BranchName,
                ProvinceCity = form.ProvinceCity,
                WardCommune = form.WardCommune,
                LocationDetail = form.LocationDetail,
                BranchUrl = form.BranchUrl,
                TimeOn = form.TimeOn,
                TimeOff = form.TimeOff,
            };
            var response = await branchService.AddBranchAsync(request, form.BranchImage);
            return Ok(response);
        }

        [HttpPost("ad2d")]
        public async Task<IActionResult> AddBrancwh([FromBody] Test form)
        {
            return null;
        }
    }
}
