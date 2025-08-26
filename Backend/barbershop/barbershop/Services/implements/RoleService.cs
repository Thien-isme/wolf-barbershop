using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class RoleService
    {
        private RoleRepository roleRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public RoleService()
        {
            roleRepository = new RoleRepository();
        }
        // TODO: Implement service methods for Role
    }
}
