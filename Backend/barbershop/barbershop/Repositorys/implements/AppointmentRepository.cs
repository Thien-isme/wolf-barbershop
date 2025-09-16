using barbershop.Models.Entitys;

namespace barbershop.Repositorys.implements
{
    public class AppointmentRepository
    {
        private readonly BarbershopContext _context;

        public AppointmentRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<Appointment> AddAppointment(Appointment newAppointment)
        {
            _context.Appointments.Add(newAppointment);
            await _context.SaveChangesAsync();
            return newAppointment;
        }

        public async Task<List<TimeOnly>> GetTimeBookedOfBarber(int barberId, DateOnly appointmentDate)
        {
            Console.WriteLine("barberId: " + barberId);
            Console.WriteLine("appointmentDate: " + appointmentDate);
            List<TimeOnly> timeBookes = _context.Appointments
                .Where(a => a.BarberId == barberId
                    && a.AppointmentDate.HasValue
                    && a.AppointmentDate.Value == appointmentDate
                    && a.IsActive == true)
                .Select(a => a.AppointmentTime.Value)
                .ToList();
            return timeBookes;
        }
    }
}
