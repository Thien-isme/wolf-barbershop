using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;
    using System;
    using System.Threading.Tasks;

    public class EmployeeImgHairService
    {
        private EmployeeImgHairRepository employeeImgHairRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public EmployeeImgHairService()
        {
            employeeImgHairRepository = new EmployeeImgHairRepository();
        }

        public async Task<BaseResponse?> GetAllByEmployeeId(int employeeId)
        {
            try
            {
                var imgHairs = await employeeImgHairRepository.GetAllByEmployeeId(employeeId);
                baseResponse.Status = 200;
                baseResponse.MessageShow = "Lấy ảnh mẫu thành công";
                baseResponse.Data = imgHairs;
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
        // TODO: Implement service methods for EmployeeImgHair
    }
}
