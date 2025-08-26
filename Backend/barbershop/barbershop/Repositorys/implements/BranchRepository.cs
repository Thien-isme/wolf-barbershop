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
            try
            {
                return _context.Branchs
                    .Include(barbershop => barbershop.Employees)
                    .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi lấy danh sách chi nhánh: {ex.Message}");
                return null; // hoặc có thể trả về thông báo lỗi tùy ý
            }
        }
    }
}
