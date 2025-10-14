using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;
    using System;

    public class ProductTypeService
    {
        private ProductTypeRepository productTypeRepository;
        private EmployeeRepository employeeRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public ProductTypeService()
        {
            productTypeRepository = new ProductTypeRepository();
            employeeRepository = new EmployeeRepository();
        }

        public async Task<BaseResponse?> GetAllProductType()
        {
            try
            {
                var types = await productTypeRepository.GetAllProductType();
                if (types != null)
                {
                    baseResponse.Status = 200;
                    baseResponse.MessageShow = "Lấy danh sách loại sản phẩm thành công!";
                    baseResponse.MessageHide = "Lấy danh sách loại sản phẩm thành công!";
                    baseResponse.Data = types;
                }
                else
                {
                    baseResponse.Status = 204;
                    baseResponse.MessageShow = "Không có loại sản phẩm nào!";
                    baseResponse.MessageHide = "Không có loại sản phẩm nào!";
                    baseResponse.Data = null;
                }
            }
            catch (Exception ex)
            {
                baseResponse.Status = 500;
                baseResponse.MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!";
                baseResponse.MessageHide = ex.Message;
                baseResponse.Data = null;
            }
            return baseResponse;
        }

        //public async Task<BaseResponse?> getAllProductTypeInBranchOfCashier(int userId)
        //{
        //    try
        //    {
        //        var branchId = await employeeRepository.FindBrandIdOfCashier(userId);

        //        var product = await productTypeRepository.getAllProductTypeInBranch(branchId);
        //        if (product == null)
        //        {
        //            return new BaseResponse
        //            {
        //                Status = 204,
        //                MessageShow = "Không có loại sản phẩm nào!",
        //                MessageHide = "Không có loại sản phẩm nào!",
        //                Data = null
        //            };
        //        }

        //        var productsResponse = product.Select(p => new ProductTypeDTO
        //        {
        //            ProductTypeId = p.ProductTypeId,
        //            ProductTypeName = p.ProductTypeName,
        //            Products = p.Products.Select(prod => new ProductDTO
        //            {
        //                ProductId = prod.ProductId,
        //                ProductName = prod.ProductName,
        //                ProductImg = prod.ProductImg,
        //                ProductPriceDTO = prod.ProductPrices
        //                .OrderByDescending(pp => pp.ProductPriceId)
        //                .Select(pp => new ProductPriceDTO
        //                {
        //                    ProductPriceId = pp.ProductPriceId,
        //                    DiscountedPrice = pp.DiscountedPrice,
        //                    OriginalPrice = pp.OriginalPrice,
        //                }).FirstOrDefault(),
        //            }).ToList()
        //        });

        //        Console.WriteLine("count" + productsResponse.Count());

        //        return new BaseResponse
        //        {
        //            Status = 200,
        //            MessageShow = "Lấy danh sách loại sản phẩm thành công!",
        //            MessageHide = "Lấy danh sách loại sản phẩm thành công!",
        //            Data = productsResponse
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        baseResponse.Status = 500;
        //        baseResponse.MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!";
        //        baseResponse.MessageHide = ex.Message;
        //        baseResponse.Data = null;
        //    }
        //    return baseResponse;
        //}
        // TODO: Implement service methods for ProductType
    }
}
