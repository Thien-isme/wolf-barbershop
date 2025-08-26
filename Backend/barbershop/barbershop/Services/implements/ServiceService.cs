using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class ServiceService
    {
        private ServiceRepository serviceRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public ServiceService()
        {
            serviceRepository = new ServiceRepository();
        }
        // TODO: Implement service methods for Service
    }
}
