using barbershop.Models.Entitys;
using barbershop.Repositorys.implements;
using barbershop.Models.ResponseDTOs;
using barbershop.Models.BarberDTO;

namespace barbershop.Services.implements
{
    public class EmployeeService
    {
        private EmployeeRepository employeeRepository;
        private BaseResponse baseResponse = new BaseResponse();

        public EmployeeService()
        {
            employeeRepository = new EmployeeRepository();
        }
        
        public async Task<BaseResponse> GetAllBarbers()
        {
            try
            {
                var barbers = await employeeRepository.GetAllBarbers();

                if (barbers != null && barbers.Count > 0)
                {
                    var barberDTOs = barbers.Select(b => new EmployeeDTO
                    {
                        EmployeeId = b.EmployeeId,
                        UserId = b.UserId,
                        BranchId = b.BranchId,
                        ExperienceYears = b.ExperienceYears,
                        Rating = b.Rating,
                        QuantityRate = b.QuantityRate,
                        IsActive = b.IsActive,
                        AvatarUrl = b.AvatarUrl,
                        EmployeeRoleId = b.EmployeeRoleId,
                        UserDTO =  new UserDTO
                        {
                            UserId = b.User.UserId,
                            UserName = b.User.FullName,
                            Email = b.User.Email,
                            Phone = b.User.Phone,
                            FullName = b.User.FullName,
                        }
                    }).ToList();

                    baseResponse.Status = 200;
                    baseResponse.MessageShow = "Barbers retrieved successfully.";
                    baseResponse.Data = barberDTOs; // Trả về DTO, không phải entity gốc
                }
                else
                {
                    baseResponse.Status = 404;
                    baseResponse.MessageShow = "Không có barbers nào";
                    baseResponse.Data = null;
                }
            }
            catch (Exception ex)
            {
                baseResponse.Status = 500;
                //baseResponse.MessageShow = "An error occurred while retrieving barbers.";
                baseResponse.MessageHide = ex.Message;
                baseResponse.Data = null;
            }

            return baseResponse;
        }
    }
}
