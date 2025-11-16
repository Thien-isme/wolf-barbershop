using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;
using System;

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

        public async Task<List<Appointment>?> GetAppointmentOfBranchFromTo(int branchId, DateTime from, DateTime to)
        {
            return await _context.Appointments
                .Where(a => a.BranchId == branchId
                    && a.AppointmentDate.HasValue
                    && a.AppointmentDate.Value >= DateOnly.FromDateTime(from)
                    && a.AppointmentDate.Value <= DateOnly.FromDateTime(to)
                    && a.IsActive == true)
                .Include(a => a.User)
                    .ThenInclude(a => a.LoyaltyPoint)
                .Include(a => a.Barber)
                    .ThenInclude(b => b.User)
                .Include(a => a.AppointmentServices)
                    .ThenInclude(aps => aps.Service)
                .OrderByDescending(a => a.AppointmentId)
                .ToListAsync();
        }

        public async Task<bool> UpdateStatus(long appointmentId, string newStatus)
        {
            var appointment = await _context.Appointments.FindAsync(appointmentId);
            if (appointment == null)
            {
                return false;
            }
            appointment.Status = newStatus;
            _context.Appointments.Update(appointment);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Appointment?> GetAppointmentById(long appointmentId)
        {
            return await _context.Appointments
                .Include(a => a.User)
                .Include(a => a.Barber)
                .Include(a => a.AppointmentServices)
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);
        }

        public async Task<int?> GetTotalBookingFromToAsync(int? branchId, DateOnly from, DateOnly to)
        {
            return await _context.Appointments
                .Where(a => a.BranchId == branchId
                    && a.AppointmentDate >= from
                    && a.AppointmentDate <= to)
                .CountAsync();

        }

        public async Task<int?> findBarberIdOfAppointment(long appointmentId)
        {
            return await _context.Appointments
                .Where(a => a.AppointmentId == appointmentId)
                .Select(a => a.BarberId)
                .FirstOrDefaultAsync();
        }
    }
}
