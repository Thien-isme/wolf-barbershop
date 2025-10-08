using barbershop.Models.Entitys;
using barbershop.Services.implements;
using Microsoft.AspNetCore.Mvc;
using barbershop.Services.implements;
using barbershop.Models.RequestDTOs;
namespace barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentServices appointmentService = new AppointmentServices();
        private readonly UserService userService = new UserService();
        // TODO: Implement API methods

        [HttpPost("create")]
        public async Task<IActionResult> CreateAppointment([FromBody] AppointmentRequest appointmentRequest)
        {
            var createdAppointment = await appointmentService.CreateAppointmentAsync(appointmentRequest);
            return Ok(createdAppointment);
        }

        [HttpGet("GetTimeBookedOfBarber")]
        public async Task<IActionResult> GetTimeBookedOfBarber(int barberId, DateOnly appointmentDate)
        {
            var bookedTimes = await appointmentService.GetTimeBookedOfBarber(barberId, appointmentDate);
            return Ok(bookedTimes);
        }

        // Lấy tất cả lịch hẹn của chi nhánh đó từ ngày hiện tại
        [HttpGet("GetAppointmentFromToday")]
        public async Task<IActionResult> GetAppointmentFromToday()
        {
            var userId = Request.Headers["Userid"].FirstOrDefault();
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("UserId header is missing.");
            }
            var appointments = await appointmentService.GetAppointmentFromToday(int.Parse(userId));
            return Ok(appointments);
        }

    }
}
