using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
    private readonly InvoiceService invoiceService = new InvoiceService();
    // TODO: Implement API methods

        [HttpPost("create-invoice")]
        [Authorize(Policy = "Cashier")]
        public IActionResult CreateInvoice([FromBody] CreateInvoiceRequest invoice)
        {
            var cashierId = Request.Headers["Userid"].FirstOrDefault();
            var response = invoiceService.CreateInvoice(invoice);
            return Ok(response);
        }



    }
}
