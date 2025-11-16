using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class DashboardService
    {
        private readonly AppointmentRepository _appointmentRepository;
        private readonly EmployeeRepository _employee_repository;
        private readonly InvoiceRepository _invoiceRepository;
        private readonly BranchesProductRepository _branchesProductRepository;

        public DashboardService(AppointmentRepository appointmentRepository, EmployeeRepository employeeRepository, InvoiceRepository invoiceRepository, BranchesProductRepository branchesProductRepository)
        {
            _appointmentRepository = appointmentRepository;
            _employee_repository = employeeRepository;
            _invoiceRepository = invoiceRepository;
            _branchesProductRepository = branchesProductRepository;
        }

        public async Task<BaseResponse> GetInfoAsync(int cashier)
        {
            try
            {
                var brandId = await _employee_repository.FindBrandIdOfCashier(cashier);
     
                // compute week range: from = nearest Monday (inclusive), to = tomorrow midnight (exclusive) so "today" is included
                DateTime today = DateTime.Today;
                int daysSinceMonday = ((int)today.DayOfWeek + 6) % 7;
                DateTime fromDateTime = today.AddDays(-daysSinceMonday); // Monday 00:00:00
                DateTime toDateTime = today.AddDays(1); // tomorrow 00:00:00 -> exclusive upper bound to include today's rows

                // DateOnly variants for repositories that expect DateOnly
                DateOnly fromDateOnly = DateOnly.FromDateTime(fromDateTime);
                DateOnly toDateOnly = DateOnly.FromDateTime(today); // if repo expects inclusive DateOnly for bookings

                Console.WriteLine("fromDateTime: " + fromDateTime);
                Console.WriteLine("toDateTime: " + toDateTime);
                Console.WriteLine("fromDateOnly: " + fromDateOnly);
                Console.WriteLine("toDateOnly: " + toDateOnly);

                var totalBookingInWeek = await _appointmentRepository.GetTotalBookingFromToAsync(brandId, fromDateOnly, toDateOnly);
                var totalCustomerInWeek = await _invoiceRepository.GetTotalCustomerFromToAsync(brandId, fromDateTime, toDateTime);
                var totalBarberInBranch = await _employee_repository.GetTotalBarberInBranchAsync(brandId);
                var totalProductInBranch = await _branchesProductRepository.GetTotalProductInBranchAsync(brandId);
                BestBarberDTO? bestBarberInWeek = await _invoiceRepository.GetBestBarberInWeekAsync(brandId, fromDateTime, toDateTime);

                Console.WriteLine("bestBarberInWeek: " + bestBarberInWeek);

                var bestBarberDetails = await _employee_repository.GetEmployeeById(bestBarberInWeek.BarberId);

                EmployeeDTO? bestBarberDTO = new EmployeeDTO
                {
                    EmployeeId = bestBarberDetails.EmployeeId,
                    FullName = bestBarberDetails.User.FullName,
                    AvatarUrl = bestBarberDetails.User.AvatarUrl,
                    TotalSlot = bestBarberInWeek.TotalSlot
                };
                Console.WriteLine("bestBarberDetails: " + bestBarberDetails);

                var totalBookingToday = await _appointmentRepository.GetTotalBookingFromToAsync(brandId, fromDateOnly, toDateOnly);
                var totalCustomerToday = await _invoiceRepository.GetTotalCustomerFromToAsync(brandId, today, toDateTime);

                var revenueChartData = await _invoiceRepository.GetRevenueInWeekChartDataAsync(brandId, toDateOnly, toDateOnly);

                var data = new
                {
                    TotalBookingInWeek = totalBookingInWeek,
                    TotalCustomerInWeek = totalCustomerInWeek,
                    TotalBarberInBranch = totalBarberInBranch,
                    TotalProductInBranch = totalProductInBranch,
                    TotalBookingToday = totalBookingToday,
                    TotalCustomerToday = totalCustomerToday,
                    BestBarberInWeek = bestBarberDTO,
                    RevenueChartData = revenueChartData
                };

                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Lấy dữ liệu thành công",
                    Data = data
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!",
                    MessageHide = ex.Message,
                    Data = null
                };
            }
        }
    }
}
