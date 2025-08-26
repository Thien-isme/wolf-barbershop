using barbershop.Models.Entitys;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class AppointmentService
    {
        private readonly AppointmentRepository appointmentRepository;

        public AppointmentService()
        {
            appointmentRepository = new AppointmentRepository();
        }
    }
}
