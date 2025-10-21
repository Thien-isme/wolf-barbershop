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

        public async Task<User> FindById(long userId)
        {
            return await userRepository.GetUserByIdAsync(userId);
        }

        public async Task<BaseResponse> GetUsersToCreateInvoice()
        {
            try
            {
                var users = await userRepository.GetUsersToCreateInvoice();

                if (users != null && users.Count > 0)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Lấy danh sách người dùng thành công!",
                        Data = users.Select(u => new UserDTO
                        {
                            UserId = u.UserId,
                            FullName = u.FullName,
                            Phone = u.Phone,
                            LoyaltyPointDTOPoints = u.LoyaltyPoint != null ? u.LoyaltyPoint.TotalPoints : 0
                        }).ToList()
                    };
                }
                else
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "Không tìm thấy người dùng nào để tạo hóa đơn!",
                        Data = null
                    };
                }

            }
            catch (Exception ex)
            {
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!",
                    MessageHide = ex.Message
                };

            }

        }
        // TODO: Implement service methods for User
    }
}
