using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;
namespace barbershop.Repositorys.implements
{
    public class EmployeeRepository
    {
        private readonly BarbershopContext _context;
        public EmployeeRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<List<Employee>?> GetAllBarbers()
        {
            return await _context.Employees
            .Include(e => e.User)
            .Where(e => e.EmployeeRoleId == 2)
            .ToListAsync();
        }
        // TODO: Implement repository methods for Employee
    }
}
