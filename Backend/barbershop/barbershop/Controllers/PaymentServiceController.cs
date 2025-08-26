using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentServiceController : ControllerBase
    {
    private readonly PaymentServiceService paymentServiceService = new PaymentServiceService();
    // TODO: Implement API methods
    }
}
