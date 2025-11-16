using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class AppointmentServices
    {
        private readonly AppointmentRepository appointmentRepository;
        private readonly UserRepository userRepository = new UserRepository();
        private readonly AppointmentServiceRepository appointmentServiceRepository = new AppointmentServiceRepository();
        private readonly EmployeeRepository employeeRepository = new EmployeeRepository();
        public AppointmentServices()
        {
            appointmentRepository = new AppointmentRepository();
        }

        public async Task<BaseResponse>? CreateAppointmentAsync(AppointmentRequest appointmentRequest)
        {
            try
            {
                //Kiểm tra sdt đó đã có tài khoản chưa
                User userExisting = await userRepository.FindByPhone(appointmentRequest.Phone);
                if (userExisting == null)
                {
                    //Tạo tài khoản mới
                    User newUser = new User
                    {
                        FullName = appointmentRequest.FullName,
                        Phone = appointmentRequest.Phone,
                        RoleId = 1, // Assuming 3 is the role ID for customers
                        IsActive = true,
                        CreateAt = DateTime.Now
                    };
                    userExisting = await userRepository.AddUser(newUser);
                }

                // Tạo cuộc hẹn mới
                Appointment newAppointment = new Appointment
                {
                    UserId = userExisting.UserId,
                    BarberId = appointmentRequest.BarberId,
                    BranchId = appointmentRequest.BranchId,
                    AppointmentDate = appointmentRequest.AppointmentDate.HasValue
                    ? DateOnly.FromDateTime(appointmentRequest.AppointmentDate.Value)
                    : null,
                    AppointmentTime = appointmentRequest.AppointmentTime,
                    Note = appointmentRequest.Note,
                    CreatedAt = DateTime.Now,
                    Status = "BOOKED", // or any default status
                    IsActive = true
                };

                Appointment createdAppointment = await appointmentRepository.AddAppointment(newAppointment);

                // 3. Add AppointmentService for each serviceId
                if (appointmentRequest.servicesId != null)
                {
                    foreach (var serviceId in appointmentRequest.servicesId)
                    {
                        var appointmentService = new AppointmentService
                        {
                            AppointmentId = createdAppointment.AppointmentId,
                            ServiceId = serviceId
                        };

                        // Fix: Ensure the Add method exists in AppointmentServiceService
                        await appointmentServiceRepository.AddAsync(appointmentService);
                    }
                }

                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Appointment created successfully",
                    Data = appointmentRequest
                };

            }
            catch (Exception ex)
            {
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "An error occurred while creating the appointment.",
                    MessageHide = ex.Message
                };
            }

            }

        public async Task<BaseResponse>? GetTimeBookedOfBarber(int barberId, DateOnly appointmentDate)
        {
            try
            {
                var bookedTimes = await appointmentRepository.GetTimeBookedOfBarber(barberId, appointmentDate);
                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Fetched booked times successfully",
                    Data = bookedTimes
                };
            }
            catch (Exception ex)
            {
                // Log the exception (ex) as needed
                return new BaseResponse(); // or handle the error as appropriate
            }
        }

        public async Task<BaseResponse?> GetAppointmentFromToday(int userId)
        {
            try
            {
                int? brandId = await employeeRepository.FindBrandIdOfCashier(userId);
                if (brandId == null)
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "User is not a cashier or does not belong to any branch.",
                        Data = null
                    };
                }

                DateTime today = DateTime.Today;
                DateTime nextDay = today.AddDays(1);
                var appointments = await appointmentRepository.GetAppointmentOfBranchFromTo(brandId.Value, today, nextDay);
                if (appointments != null)
                {
                    List<AppointmentDTO> appointmentDTOs = appointments.Select(a => new AppointmentDTO
                    {
                        AppointmentId = a.AppointmentId,
                        UserId = a.UserId,
                        BarberId = a.BarberId,
                        AppointmentDate = a.AppointmentDate,
                        AppointmentTime = a.AppointmentTime,
                        Note = a.Note,
                        Status = a.Status,
                        CreatedAt = a.CreatedAt,
                        UserDTO = new UserDTO
                        {
                            UserId = a.User?.UserId ?? 0,
                            FullName = a.User?.FullName,
                            Phone = a.User?.Phone,
                            LoyaltyPointDTO = new LoyaltyPointDTO
                            {
                                TotalPoints = a.User?.LoyaltyPoint?.TotalPoints ?? 0
                            }
                        },
                        EmployeeDTO = new EmployeeDTO
                        {
                            EmployeeId = a.Barber?.EmployeeId ?? 0,
                            FullName = a.Barber?.User?.FullName,
                        },
                        ServiceDTOs = a.AppointmentServices?.Select(aps => new ServiceDTO
                        {
                            ServiceId = aps.ServiceId,
                            ServiceName = aps.Service?.ServiceName,
                            Price = aps.Service?.Price ?? 0
                        }).ToList()
                    }).ToList();



                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Fetched appointments successfully",
                        Data = appointmentDTOs
                    };
                }


            }
            catch
            {
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "An error occurred while fetching appointments.",
                    Data = null
                };
            }


            return new BaseResponse
            {
                Status = 404,
                MessageShow = "No appointments found for today.",
                Data = null
            };
            }

        public async Task<BaseResponse>? UpdateStatusAppointment(long appointmentId, UpdateStatusAppointmentRequest request)
        {
            try
            {
                var appointment = await appointmentRepository.GetAppointmentById(appointmentId);
                if (appointment == null)
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "Appointment not found.",
                        Data = null
                    };
                }

                // Update the appointment status
                appointment.Status = request.NewStatus;
                var isUpdated = await appointmentRepository.UpdateStatus(appointment.AppointmentId, appointment.Status);
                if (isUpdated)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Appointment status updated successfully.",
                        Data = null
                    };
                }

                return new BaseResponse
                {
                    Status = 400,
                    MessageShow = "Failed to update appointment status.",
                    Data = null
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse {
                    Status = 500,
                    MessageShow = "An error occurred while updating the appointment status.",
                    MessageHide = ex.Message,
                    Data = null
                };
            }
        }

       

    }
}
