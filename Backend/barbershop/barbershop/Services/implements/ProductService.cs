using barbershop.Models.Entitys;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class ProductService
    {
        readonly ProductRepository productRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public ProductService()
        {
            productRepository = new ProductRepository();
        }

        //using Admin Manager
        public async Task<BaseResponse> GetAllProductsToManagementAsync()
        {
            try
            {
                var products = await productRepository.GetAllProductsToManagementAsync();

                if (products != null)
                {
                    var productDTOs = products.Select(p => new ProductDTO
                    {
                        ProductId = p.ProductId,
                        ProductName = p.ProductName,
                        ProductTypeId = p.ProductTypeId,
                        IsActive = p.IsActive,
                        ProductImg = p.ProductImg,
                        ProductPrices = p.ProductPrices.Select(pp => new ProductPriceDTO
                        {
                            OriginalPrice = pp.OriginalPrice,
                            DiscountedPrice = pp.DiscountedPrice,
                            DiscountStartDate = pp.DiscountStartDate,
                            DiscountEndDate = pp.DiscountEndDate,
                        }).ToList(),
                    }).ToList();


                    baseResponse.Status = StatusCodes.Status200OK;
                    baseResponse.MessageShow = "Thành công";
                    baseResponse.Data = productDTOs;
                }
            }
            catch (Exception ex)
            {
                baseResponse.Status = StatusCodes.Status500InternalServerError;
                baseResponse.MessageHide = "Lỗi hệ thống: " + ex.Message;
                baseResponse.Data = null;
            }

            return baseResponse;
        }
        public async Task<BaseResponse> GetAllProductsAsync()
        {
            try {
                //var products = await productRepository.GetAllProductsAsync();

                //if (products != null)
                //{
                //    var productDTOs = products.Select(p => new ProductDTO
                //    {
                //        ProductId = p.ProductId,
                //        ProductName = p.ProductName,
                //        ProductTypeId = p.ProductTypeId,
                //        Price = p.Price,
                //        Discount = p.Discount,
                //        Instruction = p.Instruction,
                //        isActive = p.IsActive,
                //        ProductTypeName = p.ProductType.ProductTypeName
                //    }).ToList();


                //    baseResponse.Status = StatusCodes.Status200OK;
                //    baseResponse.MessageShow = "Thành công";
                //    baseResponse.Data = productDTOs;
                //}
            }
            catch (Exception ex)
            {
                baseResponse.Status = StatusCodes.Status500InternalServerError;
                baseResponse.MessageHide = "Lỗi hệ thống: " + ex.Message;
                baseResponse.Data = null;
            }
            
            return baseResponse;
        }

        public async Task<BaseResponse> GetProductByIdAsync(int id)
        {
            try
            {
                //var product = await productRepository.GetProductByIdAsync(id);

                //if (product != null)
                //{
                //    var productDTO = new ProductDTO
                //    {
                //        ProductId = product.ProductId,
                //        ProductName = product.ProductName,
                //        ProductTypeId = product.ProductTypeId,
                //        Price = product.Price,
                //        Discount = product.Discount,
                //        Instruction = product.Instruction,
                //        isActive = product.IsActive,
                //        ProductTypeName = product.ProductType?.ProductTypeName
                //    };


                //    baseResponse.Status = StatusCodes.Status200OK;
                //    baseResponse.MessageShow = "Thành công";
                //    baseResponse.Data = productDTO;
                //}
            }
            catch (Exception ex)
            {
                baseResponse.Status = StatusCodes.Status500InternalServerError;
                baseResponse.MessageHide = "Lỗi hệ thống: " + ex.Message;
                baseResponse.Data = null;
            }

            return baseResponse;
        }



    }
}
