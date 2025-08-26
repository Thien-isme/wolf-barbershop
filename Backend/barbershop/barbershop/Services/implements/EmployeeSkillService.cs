using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class EmployeeSkillService
    {
        private EmployeeSkillRepository employeeSkillRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public EmployeeSkillService()
        {
            employeeSkillRepository = new EmployeeSkillRepository();
        }
        // TODO: Implement service methods for EmployeeSkill
    }
}
