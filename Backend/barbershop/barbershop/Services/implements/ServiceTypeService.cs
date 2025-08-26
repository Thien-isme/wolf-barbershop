using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class ServiceTypeService
    {
        private ServiceTypeRepository serviceTypeRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public ServiceTypeService()
        {
            serviceTypeRepository = new ServiceTypeRepository();
        }
        // TODO: Implement service methods for ServiceType
    }
}
