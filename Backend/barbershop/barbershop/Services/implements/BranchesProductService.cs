using barbershop.Models.ResponseDTOs;
using barbershop.Models.Entitys;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class BranchesProductService
    {
        private readonly BranchesProductRepository branchesProductRepository;
        private readonly BranchRepository branchRepository = new BranchRepository();
        private EmployeeRepository employeeRepository;
        public BranchesProductService()
        {
            branchesProductRepository = new BranchesProductRepository();
            employeeRepository = new EmployeeRepository();
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


                Console.WriteLine("Branch ID: " + branchId);
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

        public async Task<BaseResponse?> getAllProductTypeInBranchOfCashier(int userId)
        {
            try
            {
                var branchId = await employeeRepository.FindBrandIdOfCashier(userId);

                var product = await branchesProductRepository.getAllProductTypeInBranch(branchId);
                if (product == null)
                {
                    return new BaseResponse
                    {
                        Status = 204,
                        MessageShow = "Không có loại sản phẩm nào!",
                        MessageHide = "Không có loại sản phẩm nào!",
                        Data = null
                    };
                }

                Console.WriteLine("Product types count: " + product);
                // Lấy danh sách ProductType không trùng lặp
                var distinctProductTypes = product
                    .Select(bp => bp.Product?.ProductType)
                    .Where(pt => pt != null)
                    .GroupBy(pt => pt.ProductTypeId)
                    .Select(g => g.First())
                    .ToList();


                //var response = distinctProductTypes.Select(ppt => new ProductTypeDTO
                //{
                //    ProductTypeId = ppt.ProductTypeId,
                //    ProductTypeName = ppt.ProductTypeName,
                //    ProductDTOs = ppt.Products.Select(p => new ProductDTO
                //    {
                //        ProductId = p.ProductId,
                //        ProductName = p.ProductName,
                //        ProductPriceDTO = p.ProductPrices.OrderByDescending(pp => pp.ProductPriceId).Select(pp => new ProductPriceDTO
                //        {
                //            DiscountedPrice = pp.DiscountedPrice,
                //            OriginalPrice = pp.OriginalPrice
                //        }).FirstOrDefault(),
                //        SizeName = ppt.Size.
                //    }).ToList()

                //}).ToList();

                var response = distinctProductTypes.Select(ppt => new ProductTypeDTO
                {
                    ProductTypeId = ppt.ProductTypeId,
                    ProductTypeName = ppt.ProductTypeName,
                    ProductDTOs = product
                        .Where(bp => bp.Product?.ProductTypeId == ppt.ProductTypeId)
                        .Select(bp => new ProductDTO
                        {
                            ProductId = bp.ProductId ?? 0,
                            ProductName = bp.Product?.ProductName,
                            ProductPriceDTO = bp.Product?.ProductPrices
                                .OrderByDescending(pp => pp.ProductPriceId)
                                .Select(pp => new ProductPriceDTO
                                {
                                    DiscountedPrice = pp.DiscountedPrice,
                                    OriginalPrice = pp.OriginalPrice
                                }).FirstOrDefault(),
                            SizeId = bp.SizeId,
                            SizeName = bp.Size?.SizeName,
                            Quantity = bp.Quantity
                        }).ToList()
                }).ToList();


                //var productsResponse = product.Select(p => new ProductTypeDTO
                //{
                //    ProductTypeId = p.ProductTypeId,
                //    ProductTypeName = p.ProductTypeName,
                //    Products = p.Products.Select(prod => new ProductDTO
                //    {
                //        ProductId = prod.ProductId,
                //        ProductName = prod.ProductName,
                //        ProductImg = prod.ProductImg,
                //        ProductPriceDTO = prod.ProductPrices
                //        .OrderByDescending(pp => pp.ProductPriceId)
                //        .Select(pp => new ProductPriceDTO
                //        {
                //            ProductPriceId = pp.ProductPriceId,
                //            DiscountedPrice = pp.DiscountedPrice,
                //            OriginalPrice = pp.OriginalPrice,
                //        }).FirstOrDefault(),
                //    }).ToList()
                //});


                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Lấy danh sách loại sản phẩm thành công!",
                    MessageHide = "Lấy danh sách loại sản phẩm thành công!",
                    Data = response
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!",
                    MessageHide = ex.Message,
                    Data = null
                };
            }
        }
    }
}
