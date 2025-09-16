using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;
    using System;
    using System.Threading.Tasks;

    public class AppointmentServiceService
    {
        private AppointmentServiceRepository appointmentServiceRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public AppointmentServiceService()
        {
            appointmentServiceRepository = new AppointmentServiceRepository();
        }

       
        // TODO: Implement service methods for AppointmentService
    }
}
