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
    }
}
