using barbershop.Models.Entitys;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
    private readonly AppointmentService appointmentService = new AppointmentService();
    // TODO: Implement API methods
    }
}
