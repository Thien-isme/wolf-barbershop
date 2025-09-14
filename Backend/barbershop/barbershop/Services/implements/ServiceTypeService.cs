using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;
    using System;
    using System.Collections.Generic;
    

    public class ServiceTypeService
    {
        private ServiceTypeRepository serviceTypeRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public ServiceTypeService()
        {
            serviceTypeRepository = new ServiceTypeRepository();
        }

        public async Task<BaseResponse?> GetAllTypeServices()
        {
            try
            {
                var serviceTypes = serviceTypeRepository.GetAllTypeServices();
                if (serviceTypes != null && serviceTypes.Any())
                {
                    List<ServiceTypeDTO> serviceTypeDTO = serviceTypes.Where(s => s.IsActive==true).Select(st => new ServiceTypeDTO
                    {
                        ServiceTypeId = st.ServiceTypeId,
                        ServiceTypeName = st.ServiceTypeName,
                        IsActive = st.IsActive,
                        Services = st.Services.Where(s => s.IsActive).Select(s => new ServiceDTO
                        {
                            ServiceId = s.ServiceId,
                            ServiceName = s.ServiceName,
                            Description = s.Description,
                            Price = s.Price,
                            DurationMin = s.DurationMin,
                            IsActive = s.IsActive
                        }).ToList()
                    }).ToList();

                    baseResponse.Status = 200;
                    baseResponse.MessageShow = "Lấy danh sách loại dịch vụ thành công";
                    baseResponse.MessageHide = "Lấy danh sách loại dịch vụ thành công";
                    baseResponse.Data = serviceTypeDTO;
                }
                else
                {
                    baseResponse.Status = 204;
                    baseResponse.MessageShow = "Không có loại dịch vụ nào";
                    baseResponse.MessageHide = "Không có loại dịch vụ nào";
                    baseResponse.Data = null;
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
        // TODO: Implement service methods for ServiceType
    }
}
