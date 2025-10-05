using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;
    using System;
    using System.Threading.Tasks;

    public class ServiceService
    {
        private ServiceRepository serviceRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public ServiceService()
        {
            serviceRepository = new ServiceRepository();
        }

        // TODO: Implement service methods for Service
        public async Task<BaseResponse>? GetAllServices()
        {
            try {                 
                var services = await serviceRepository.GetAllServices();
                baseResponse.Status = 200;
                baseResponse.MessageShow = "Lấy dịch vụ thành công";
                baseResponse.Data = services;
            }
            catch (Exception ex)
            {
                baseResponse.Status = 500;
                baseResponse.MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!";
                baseResponse.MessageHide = ex.Message;
                baseResponse.Data = null;
            }
            return baseResponse;
        }

        public async Task<BaseResponse>? GetAllServicesIsOutStanding()
        {
            try
            {
                var services = await serviceRepository.GetAllServicesIsOutStanding();

                if(services != null)
                {

                    List<ServiceDTO> serviceDTOs = services.Select(s => new ServiceDTO
                    {
                        ServiceId = s.ServiceId,
                        ServiceName = s.ServiceName,
                        Description = s.Description,
                        ServiceImage = s.ServiceImage,
                        // Map other properties as needed
                    }).ToList();

                    baseResponse.Status = 200;
                    baseResponse.MessageShow = "Lấy dịch vụ thành công";
                    baseResponse.Data = serviceDTOs;
                }

            }
            catch (Exception ex)
            {
                baseResponse.Status = 500;
                baseResponse.MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!";
                baseResponse.MessageHide = ex.Message;
                baseResponse.Data = null;
            }
            return baseResponse;


        }
    }
}
