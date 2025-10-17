using barbershop.Models.RequestDTOs;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace barbershop.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly InvoiceService invoiceService = new InvoiceService();
        // TODO: Implement API methods
        [HttpPost("create-invoice")]
        [Authorize(Policy = "Cashier")]
        public async Task<IActionResult> CreateInvoice([FromBody] CreateInvoiceRequest invoice)
        {
            var cashierId = Request.Headers["Userid"].FirstOrDefault();
            var response = await invoiceService.CreateInvoice(invoice, cashierId);
            return Ok(response);
        }
    }
}
