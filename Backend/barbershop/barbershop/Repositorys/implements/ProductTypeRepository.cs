using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class ProductTypeRepository
    {
        private readonly BarbershopContext _context;
        public ProductTypeRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<List<ProductType>?> GetAllProductType()
        {
            return await _context.ProductTypes.ToListAsync();
        }

        public async Task<List<ProductType>?> getAllProductTypeInBranch(int? branchId)
        {
            return await _context.ProductTypes
                .Include(pt => pt.Products)
                    .ThenInclude(p => p.ProductPrices)
                .Include(pt => pt.Products)
                    .ThenInclude(p => p.ProductSizes)
                        .ThenInclude(p => p.Size)
                .Include(pt => pt.Products)
                    .ThenInclude(p => p.ProductSizes)
                        .ThenInclude(p => p.Inventories)
                .Where(pt => pt.Products.Any(p => p.ProductPrices.Any()
                    && p.BranchesProducts.Any(pp => pp.BranchId == branchId && pp.Quantity > 0)))
                    .ToListAsync();  
        }
        // TODO: Implement repository methods for ProductType
    }
}
