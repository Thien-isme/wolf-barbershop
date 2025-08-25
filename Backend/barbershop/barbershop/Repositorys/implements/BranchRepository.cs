using barbershop.Models.Entitys;

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
            try
            {
                _context.Branchs.Add(branch);
                await _context.SaveChangesAsync();
                return branch;
            }
            catch (Exception ex)
            {
                // Ghi log hoặc xử lý lỗi tại đây nếu cần
                return null; // hoặc có thể trả về thông báo lỗi tùy ý
            }
        }
    }
}
