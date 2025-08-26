using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class EmployeeImgHairService
    {
        private EmployeeImgHairRepository employeeImgHairRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public EmployeeImgHairService()
        {
            employeeImgHairRepository = new EmployeeImgHairRepository();
        }
        // TODO: Implement service methods for EmployeeImgHair
    }
}
