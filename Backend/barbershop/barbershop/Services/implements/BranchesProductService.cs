using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class BranchesProductService
    {
        private readonly BranchesProductRepository branchesProductRepository;
        private readonly BranchRepository branchRepository = new BranchRepository();

        public BranchesProductService()
        {
            branchesProductRepository = new BranchesProductRepository();
        }

        public async Task<BaseResponse?> GetAllProductInBranch(int userId)
        {
            try
            {
                var branchId = await branchRepository.GetBranchIdByUserId(userId);


                if (branchId == null)
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "Không tìm thấy chi nhánh!",
                        MessageHide = "None",
                        Data = null
                    };
                }

                var branchProducts = await branchesProductRepository.GetAllProductInBranch(branchId.Value);

                if (branchProducts == null || !branchProducts.Any())
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "Chi nhánh hiện không có sản phẩm nào!",
                        MessageHide = "None",
                        Data = null
                    };
                }

                List<ProductDTO> ProductDTOs = branchProducts.Select(bp => new ProductDTO
                {
                    ProductId = bp.ProductId,
                    ProductName = bp.Product.ProductName,
                    ProductPriceDTO = bp.Product.ProductPrices.OrderByDescending(pp => pp.ProductPriceId).Select(pp => new ProductPriceDTO
                    {
                        DiscountedPrice = pp.DiscountedPrice,
                        OriginalPrice = pp.OriginalPrice
                    }).FirstOrDefault(),
                    SizeName = bp.Size.SizeName,
                    Quantity = bp.Quantity,
                    ProductTypeId = bp.Product.ProductTypeId,
                    ProductTypeName = bp.Product.ProductType.ProductTypeName,

                }).ToList();

                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Lấy danh sách sản phẩm trong chi nhánh thành công!",
                    MessageHide = "None",
                    Data = ProductDTOs
                };
            }
            catch
            {
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!",
                    MessageHide = "None",
                    Data = null
                };
            }




        }
    }
}
