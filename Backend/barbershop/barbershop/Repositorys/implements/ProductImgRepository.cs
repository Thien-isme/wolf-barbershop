using barbershop.Models.Entitys;

namespace barbershop.Repositorys.implements
{
    public class ProductImgRepository
    {
        readonly BarbershopContext _context;
        public ProductImgRepository()
        {
            _context = new BarbershopContext();
        }
        public async Task<ProductImg> Add(ProductImg productImg)
        {
            var productImgAdded = _context.ProductImgs.Add(productImg);
            await _context.SaveChangesAsync();
            return productImgAdded.Entity;
        }
    }
}
