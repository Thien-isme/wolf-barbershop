using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class AppointmentServices
    {
        private readonly AppointmentRepository appointmentRepository;

        public AppointmentServices()
        {
            appointmentRepository = new AppointmentRepository();
        }

        public async Task<BaseResponse>? CreateAppointmentAsync(AppointmentRequest appointmentRequest)
        {
            return new BaseResponse
            {
                Status = 200,
                MessageShow = "Tạo lịch hẹn thành công",
                MessageHide = "Create appointment successfully",
            };
        }
    }
}
