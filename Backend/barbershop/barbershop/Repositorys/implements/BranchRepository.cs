using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class BranchRepository
    {
        private readonly BarbershopContext _context;
        public BranchRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<Branch?> AddBranchAsync(Branch branch)
        {

            _context.Branchs.Add(branch);
            await _context.SaveChangesAsync();
            return branch;

        }

        public async Task<List<Branch>?> GetAllBranchesAsync()
        {
            return _context.Branchs
                .Include(barbershop => barbershop.Employees)
                .ToList();
        }

        public async Task<int?> GetBranchIdByUserId(int userId)
        {
            return await _context.Employees
                .Where(e => e.UserId == userId)
                .Select(e => e.BranchId)
                .FirstOrDefaultAsync();
        }
    }
}
