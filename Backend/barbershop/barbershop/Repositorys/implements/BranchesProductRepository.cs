using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class BranchesProductRepository
    {
        private readonly BarbershopContext barbershopContext;

        public BranchesProductRepository()
        {
            barbershopContext = new BarbershopContext();
        }

        public async Task<List<BranchesProduct>?> GetAllProductInBranch(int value)
        {
            return barbershopContext.BranchesProducts
                .Include(bp => bp.Product)
                    .ThenInclude(p => p.ProductPrices)
                .Include(bp => bp.Product)
                    .ThenInclude(p => p.ProductType)
                .Include(bp => bp.Size)
                .Where(bp => bp.BranchId == value && bp.Quantity > 0)
                .ToList();
        }
    }
}
