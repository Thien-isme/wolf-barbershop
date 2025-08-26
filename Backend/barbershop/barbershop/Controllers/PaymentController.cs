using barbershop.Models.Entitys;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
    private readonly PaymentService paymentService = new PaymentService();
    // TODO: Implement API methods
    }
}
