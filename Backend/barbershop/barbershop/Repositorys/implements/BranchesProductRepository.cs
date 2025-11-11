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

        public async void BeginTransaction()
        {
            await barbershopContext.Database.BeginTransactionAsync();
        }

        public async Task CommitTransaction()
        {
            await barbershopContext.Database.CommitTransactionAsync();
        }

        public async Task RollbackTransaction()
        {
            await barbershopContext.Database.RollbackTransactionAsync();
        }

        public async Task<List<BranchesProduct>?> GetAllProductInBranch(int branchId)
        {
            return barbershopContext.BranchesProducts
                .Include(bp => bp.Product)
                    .ThenInclude(p => p.ProductPrices)
                .Include(bp => bp.Product)
                    .ThenInclude(p => p.ProductType)
                .Include(bp => bp.Size)
                .Where(bp => bp.BranchId == branchId)
                .ToList();
        }

        public async Task<List<BranchesProduct>?>  getAllProductTypeInBranch(int? branchId)
        {
            return await barbershopContext.BranchesProducts
                .Include(bp => bp.Product)
                    .ThenInclude(p => p.ProductType)
                .Include(bp => bp.Product)
                    .ThenInclude(p => p.ProductPrices)
                .Include(bp => bp.Size)
                .Where(bp => bp.BranchId == branchId && bp.Quantity > 0)
                .ToListAsync();
        }

        

        public async Task<bool> ReduceQuantityProductSelled(int branchId, int productId, int quantity, int sizeId)
        {
            var productInBranch = await barbershopContext.BranchesProducts
                .FirstOrDefaultAsync(bp => bp.BranchId == branchId && bp.ProductId == productId && bp.SizeId == sizeId);
            if (productInBranch == null || productInBranch.Quantity < quantity)
            {
                return false; // Not enough stock or product not found
            }
            productInBranch.Quantity -= quantity;
            barbershopContext.BranchesProducts.Update(productInBranch);
            bool saveSuccess = await barbershopContext.SaveChangesAsync() > 0;
            return saveSuccess;
        }

        public async Task<BranchesProduct?> GetBranchProductEntity(int? branchId, int productId, int? sizeId)
        {
            var branchProduct = await barbershopContext.BranchesProducts
                .FirstOrDefaultAsync(bp => bp.BranchId == branchId && bp.ProductId == productId && bp.SizeId == sizeId);
            return branchProduct;
        }

        public async Task<bool> UpdateBranchesProduct(BranchesProduct branchProduct)
        {
            barbershopContext.BranchesProducts.Update(branchProduct);
            bool saveSuccess = await barbershopContext.SaveChangesAsync() > 0;
            return saveSuccess;
        }

        public async Task<bool> RemoveProductInBranch(int branchesProductId)
        {
            var branchProduct = await barbershopContext.BranchesProducts.FindAsync(branchesProductId);
            if (branchProduct == null)
            {
                return false;
            }

            branchProduct.IsActive = false;
            barbershopContext.BranchesProducts.Update(branchProduct);
            return await barbershopContext.SaveChangesAsync() > 0;
        }
    }
}
