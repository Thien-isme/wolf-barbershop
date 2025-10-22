using barbershop.Models.Entitys;
using barbershop.Repositorys.implements;
using barbershop.Models.ResponseDTOs;
using barbershop.Models.BarberDTO;
using barbershop.Models.RequestDTOs;
using System.Diagnostics;

namespace barbershop.Services.implements
{
    public class EmployeeService
    {
        private EmployeeRepository employeeRepository;
        private UserRepository userRepository = new UserRepository();
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
                        //ExperienceYears = b.ExperienceYears,
                        Rating = b.Rating,
                        QuantityRate = b.QuantityRate,
                        IsActive = b.IsActive,
                        AvatarUrl = b.AvatarUrl,
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

                    Debug.WriteLine("Barbers retrieved: " + barberDTOs.Count);
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

        public async Task<BaseResponse?> AddBarber(AddBarberRequest request, IFormFile? avatar)
        {
            try
            {
                // Validate input data
                if (string.IsNullOrEmpty(request.FullName) || string.IsNullOrEmpty(request.Phone) ||
                    string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Email) ||
                    string.IsNullOrEmpty(request.Password) || request.BranchId == null)
                {
                    baseResponse.Status = 400;
                    baseResponse.MessageShow = "Invalid input data.";
                    return baseResponse;
                }
                // Create User entity
                var user = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    Phone = request.Phone,
                    FullName = request.FullName,
                    Dob = request.Dob,
                    Cccd = request.CCCD,
                    RoleId = 2, // Assuming 2 is the role ID for barbers
                    Password = request.Password,
                    IsActive = true,
                    CreateAt = DateTime.UtcNow,
                };
                
                // Create Employee entity
                var employee = new Employee
                {
                    UserId = user.UserId, // chỉ cần gán UserId
                    BranchId = request.BranchId.Value,
                    ExperienceYears = request.ExperienceYears ?? 0,
                    Rating = 0.0m,
                    QuantityRate = 0,
                    IsActive = true,
                    AvatarUrl = await CloudinaryHelper.UploadImageAsync(avatar) // Upload avatar and get URL
                };
                // Save to database
                user = await userRepository.AddUser(user);
                Console.WriteLine("1");
                Console.WriteLine("userID: " + user.UserId);
                employee.UserId = user.UserId; // Set the foreign key relationship
                employee = await employeeRepository.AddBarber(employee);
                Console.WriteLine("2");

                var barberDTO = new EmployeeDTO
                {
                    EmployeeId = employee.EmployeeId,
                    UserId = user.UserId,
                    BranchId = employee.BranchId,
                    ExperienceYears = employee.ExperienceYears,
                    Rating = employee.Rating,
                    QuantityRate = employee.QuantityRate,
                    IsActive = employee.IsActive,
                    AvatarUrl = employee.AvatarUrl,
                    UserDTO = new UserDTO
                    {
                        UserId = user.UserId,
                        UserName = user.FullName,
                        Email = user.Email,
                        Phone = user.Phone,
                        FullName = user.FullName,
                    }
                };

                baseResponse.Status = 200;
                baseResponse.MessageShow = "Barber added successfully.";
                baseResponse.Data = barberDTO; // You can return the created barber's ID or details if needed
            }
            catch (Exception ex)
            {
                baseResponse.Status = 500;
                baseResponse.MessageShow = "An error occurred while adding the barber.";
                baseResponse.MessageHide = ex.Message;
                baseResponse.Data = null;
            }
            return baseResponse;
        }

        public async Task<BaseResponse?> GetBarbersInBranch(int branchId)
        {
            try
            {
                var barbers = await employeeRepository.GetBarbersInBranch(branchId);

                if (barbers != null && barbers.Count > 0)
                {
                    var barberDTOs = barbers.Select(b => new EmployeeDTO
                    {
                        EmployeeId = b.EmployeeId,
                        UserId = b.UserId,
                        BranchId = b.BranchId,
                        //ExperienceYears = b.ExperienceYears,
                        Rating = b.Rating,
                        QuantityRate = b.QuantityRate,
                        IsActive = b.IsActive,
                        AvatarUrl = b.AvatarUrl,
                        UserDTO = new UserDTO
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

                    Debug.WriteLine("Barbers retrieved: " + barberDTOs.Count);
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

        public async Task<BaseResponse> getBranchIdOfCashier(int cashierId)
        {
            try
            {
                var branchId = await employeeRepository.FindBrandIdOfCashier(cashierId);
                if (branchId != null)
                {
                    baseResponse.Status = 200;
                    baseResponse.MessageShow = "Branch ID retrieved successfully.";
                    baseResponse.Data = new
                    {
                        branchId = branchId,
                    };
                }
                else
                {
                    baseResponse.Status = 404;
                    baseResponse.MessageShow = "Cashier not found or inactive.";
                    baseResponse.Data = null;
                }
            }
            catch (Exception ex)
            {
                baseResponse.Status = 500;
                baseResponse.MessageShow = "An error occurred while retrieving branch ID.";
                baseResponse.MessageHide = ex.Message;
                baseResponse.Data = null;
            }
            return baseResponse;
        }
    }
}
