using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;
    using System;
    using System.Threading.Tasks;

    public class UserService
    {
        private UserRepository userRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public UserService()
        {
            userRepository = new UserRepository();
        }

        public async Task<User> FindByEmail(string email)
        {
            return await userRepository.GetUserByEmailAsync(email);
        }

        public async Task<User> AddUser(User user)
        {
            return await userRepository.AddUser(user);
        }
        // TODO: Implement service methods for User
    }
}
