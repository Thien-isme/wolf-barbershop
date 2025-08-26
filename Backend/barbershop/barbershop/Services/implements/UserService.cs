using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class UserService
    {
        private UserRepository userRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public UserService()
        {
            userRepository = new UserRepository();
        }
        // TODO: Implement service methods for User
    }
}
