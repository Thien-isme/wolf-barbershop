using barbershop.Models.ResponseDTOs;
using barbershop.Models.Entitys;
using barbershop.Repositorys.implements;
using barbershop.Models.RequestDTOs;

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
                    ProductImg = bp.Product.ProductImg,
                    ProductPriceDTO = bp.Product.ProductPrices.OrderByDescending(pp => pp.ProductPriceId).Select(pp => new ProductPriceDTO
                    {
                        DiscountedPrice = pp.DiscountedPrice,
                        OriginalPrice = pp.OriginalPrice
                    }).FirstOrDefault(),
                    SizeId = bp.SizeId,
                    SizeName = bp.Size.SizeName,
                    Quantity = bp.Quantity,
                    ProductTypeId = bp.Product.ProductTypeId,
                    ProductTypeName = bp.Product.ProductType.ProductTypeName,
                    BranchesProductId = bp.BranchesProductId,
                    IsActive = bp.IsActive
                }).ToList();

                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Lấy danh sách sản phẩm trong chi nhánh thành công!",
                    MessageHide = "None",
                    Data = ProductDTOs
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

        public async Task<BaseResponse> PlusQuantityProduct(PlusOrSubQuantityProductRequest plusQuantityProductRequest, int userId)
        {
            try
            {
                var branchId = await employeeRepository.FindBrandIdOfCashier(userId);

                var branchProduct = await branchesProductRepository.GetBranchProductEntity(branchId, plusQuantityProductRequest.ProductId, plusQuantityProductRequest.SizeId);
                if (branchProduct == null)
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "Sản phẩm không tồn tại trong chi nhánh!",
                        MessageHide = "Sản phẩm không tồn tại trong chi nhánh!",
                        Data = null
                    };
                }
                var newQuantity = branchProduct.Quantity + plusQuantityProductRequest.Quantity;
                branchProduct.Quantity = newQuantity;
                var isUpdateSuccess = await branchesProductRepository.UpdateBranchesProduct(branchProduct);

                if (isUpdateSuccess == true)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Cập nhật số lượng sản phẩm thành công!",
                        MessageHide = "Cập nhật số lượng sản phẩm thành công!",
                        Data = null
                    };
                }
                else
                {
                    return new BaseResponse
                    {
                        Status = 500,
                        MessageShow = "Cập nhật số lượng sản phẩm thất bại!",
                        MessageHide = "Cập nhật số lượng sản phẩm thất bại!",
                        Data = null
                    };
                }
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

        public async Task<BaseResponse> SubQuantityProduct(PlusOrSubQuantityProductRequest subQuantityProductRequest, int userId)
        {
            try
            {
                var branchId = await employeeRepository.FindBrandIdOfCashier(userId);

                var product = await branchesProductRepository.GetBranchProductEntity(branchId, subQuantityProductRequest.ProductId, subQuantityProductRequest.SizeId);
                if (product == null)
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "Sản phẩm không tồn tại trong chi nhánh!",
                        MessageHide = "Sản phẩm không tồn tại trong chi nhánh!",
                        Data = null
                    };
                }

                if(product.Quantity < subQuantityProductRequest.Quantity)
                {
                    return new BaseResponse
                    {
                        Status = 400,
                        MessageShow = "Số lượng sản phẩm trong kho không đủ để thực hiện thao tác!",
                        MessageHide = "Số lượng sản phẩm trong kho không đủ để thực hiện thao tác!",
                        Data = null
                    };
                }


                var newQuantity = product.Quantity - subQuantityProductRequest.Quantity;
                product.Quantity = newQuantity;
                var isUpdateSuccess = await branchesProductRepository.UpdateBranchesProduct(product);

                if (isUpdateSuccess == true)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Đã giảm " + subQuantityProductRequest.Quantity +  " sản phẩm trong kho thành công",
                        MessageHide = "Cập nhật số lượng sản phẩm thành công",
                        Data = null
                    };
                }
                else
                {
                    return new BaseResponse
                    {
                        Status = 500,
                        MessageShow = "Cập nhật số lượng sản phẩm thất bại!",
                        MessageHide = "Cập nhật số lượng sản phẩm thất bại!",
                        Data = null
                    };
                }
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

        public async Task<BaseResponse?> RemoveProductInBranch(int branchesProductId)
        {
            try
            {
                branchesProductRepository.BeginTransaction();
                var isDeleteSuccess = await branchesProductRepository.RemoveProductInBranch(branchesProductId);
                if (isDeleteSuccess == true)
                {
                    await branchesProductRepository.CommitTransaction();
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Xóa sản phẩm trong chi nhánh thành công!",
                        MessageHide = "Xóa sản phẩm trong chi nhánh thành công!",
                        Data = null
                    };
                }
                else
                {
                    await branchesProductRepository.RollbackTransaction();
                    return new BaseResponse
                    {
                        Status = 500,
                        MessageShow = "Xóa sản phẩm trong chi nhánh thất bại!",
                        MessageHide = "Xóa sản phẩm trong chi nhánh thất bại!",
                        Data = null
                    };
                }
            }
            catch(Exception ex)
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
