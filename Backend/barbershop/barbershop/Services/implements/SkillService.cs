using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class SkillService
    {
        private SkillRepository skillRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public SkillService()
        {
            skillRepository = new SkillRepository();
        }
        // TODO: Implement service methods for Skill
    }
}
