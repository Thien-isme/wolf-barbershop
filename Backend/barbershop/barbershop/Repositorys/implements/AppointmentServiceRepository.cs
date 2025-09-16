using barbershop.Models.Entitys;

namespace barbershop.Repositorys.implements
{
    public class AppointmentServiceRepository
    {
        private readonly BarbershopContext _context;
        public AppointmentServiceRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<bool> AddAsync(AppointmentService appointmentService)
        {
            try
            {
                _context.AppointmentServices.Add(appointmentService);
                await _context.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                // Log the exception (ex) if necessary
                return false;
            }
        }
        // TODO: Implement repository methods for AppointmentService
    }
}
