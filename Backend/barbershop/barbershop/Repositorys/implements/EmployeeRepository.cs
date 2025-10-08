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
            .OrderByDescending(e => e.EmployeeId)
            .ToListAsync();
        }

        public async Task<Employee?> AddBarber(Employee employee)
        {
            try
            {
                Console.WriteLine("Adding barber: " + employee.EmployeeId);
                _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;

            } catch (Exception ex)
            {
                Console.WriteLine("Error adding barber: " + ex.Message);
                if (ex.InnerException != null)
                    Console.WriteLine("Inner exception: " + ex.InnerException.Message);
                return null;
            }
        }

        public async Task<List<Employee>?> GetBarbersInBranch(int branchId)
        {
            return await _context.Employees
                .Include(e => e.EmployeeSkills)
                .Include(e => e.User)
                .Where(e => e.BranchId == branchId)
                .Where(e => e.EmployeeSkills.Where(es => es.SkillId == 1).Any())
                .Where(e => e.IsActive == true)
                .OrderByDescending(e => e.EmployeeId)
                .ToListAsync();
        }

        
            public async Task<int> FindBrandIdOfCashier(int userId)
        {
            return await _context.Employees
                .Where(u => u.UserId == userId && u.IsActive == true)
                .Select(u => u.BranchId)
                .FirstOrDefaultAsync();
                }
        // TODO: Implement repository methods for Employee
    }
}
