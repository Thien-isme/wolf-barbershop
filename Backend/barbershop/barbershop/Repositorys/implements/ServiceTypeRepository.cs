using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class ServiceTypeRepository
    {
        private readonly BarbershopContext _context;
        public ServiceTypeRepository()
        {
            _context = new BarbershopContext();
        }

        public List<ServiceType?> GetAllTypeServices()
        {
            return _context.ServiceTypes
                .Include(st => st.Services)
                .ToList();
        }
        // TODO: Implement repository methods for ServiceType
    }
}
