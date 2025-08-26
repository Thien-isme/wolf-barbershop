using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;

namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentServiceController : ControllerBase
    {
    private readonly AppointmentServiceService appointmentServiceService = new AppointmentServiceService();
    // TODO: Implement API methods
    }
}
