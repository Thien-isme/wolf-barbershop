using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class ServiceRepository
    {
        private readonly BarbershopContext _context;
        public ServiceRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<List<Service?>> GetAllServices()
        {
            List<Service> services =  await _context.Services
                        .Where(s=> s.IsActive == true)
                        .ToListAsync();
            return services;
        }

        public async Task<List<Service?>> GetAllServicesIsOutStanding()
        {
            return await _context.Services
                        .Where(s => s.IsActive == true && s.IsOutstanding == true)
                        .ToListAsync();
        }
        // TODO: Implement repository methods for Service
    }
}
