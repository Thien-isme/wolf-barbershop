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
    }
}
