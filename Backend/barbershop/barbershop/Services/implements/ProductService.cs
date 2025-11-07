using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;
using Google.Apis.Logging;

namespace barbershop.Services.implements
{
    public class ProductService
    {
        readonly private BarbershopContext _context = new BarbershopContext();
        readonly private ProductRepository productRepository;
        readonly private EmployeeRepository employeeRepository = new EmployeeRepository();
        readonly private ProductSizeRepository productSizeRepository = new ProductSizeRepository();
        readonly private ProductImgRepository productImgRepository = new ProductImgRepository();
        readonly private ProductPriceRepository productPriceRepository = new ProductPriceRepository();
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
                        ProductImg = p.ProductImg,
                        ProductPriceDTO = p.ProductPrices
                            .OrderByDescending(pp => pp.CreatedAt)
                            .Select(pp => new ProductPriceDTO
                            {
                                ProductPriceId = pp.ProductPriceId,
                                DiscountedPrice = pp.DiscountedPrice,
                                OriginalPrice = pp.OriginalPrice,
                                DiscountEndDate = pp.DiscountEndDate,
                                DiscountStartDate = pp.DiscountStartDate,
                                CreatedAt = pp.CreatedAt,
                                IsActive = pp.IsActive,
                            })
                            .FirstOrDefault(),
                        Instruction = p.Instruction,
                        IsActive = p.IsActive,
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


        public async Task<BaseResponse> GetProductByIdAsync(int id)
        {
            try
            {
                var product = await productRepository.GetProductByIdAsync(id);


                if (product != null)
                {
                    var productDTO = new ProductDTO
                    {
                        ProductId = product.ProductId,
                        ProductName = product.ProductName,
                        ProductTypeId = product.ProductTypeId,
                        ProductPriceDTO = product.ProductPrices
                            .OrderByDescending(pp => pp.CreatedAt)
                            .Select(pp => new ProductPriceDTO
                            {
                                ProductPriceId = pp.ProductPriceId,
                                DiscountedPrice = pp.DiscountedPrice,
                                OriginalPrice = pp.OriginalPrice,
                                DiscountEndDate = pp.DiscountEndDate,
                                DiscountStartDate = pp.DiscountStartDate,
                                CreatedAt = pp.CreatedAt,
                                IsActive = pp.IsActive,
                            })
                            .FirstOrDefault(),
                        Instruction = product.Instruction,
                        IsActive = product.IsActive,
                    };


                    baseResponse.Status = StatusCodes.Status200OK;
                    baseResponse.MessageShow = "Thành công";
                    baseResponse.Data = productDTO;
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

        public async Task<BaseResponse> GetAllProductsIsOutStandingAsync()
        {
            try
            {
                var product = await productRepository.GetAllProductsIsOutStandingAsync();
                if (product == null)
                {
                    baseResponse.Status = StatusCodes.Status404NotFound;
                    baseResponse.MessageShow = "Không tìm thấy sản phẩm nổi bật";
                    baseResponse.Data = null;
                    return baseResponse;
                }

                var productDTOs = product.Select(p => new ProductDTO
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Instruction = p.Instruction,
                    ProductPriceDTO = p.ProductPrices
                        .OrderByDescending(pp => pp.CreatedAt)
                        .Select(pp => new ProductPriceDTO
                        {
                            DiscountedPrice = pp.DiscountedPrice,
                            OriginalPrice = pp.OriginalPrice,
                            DiscountEndDate = pp.DiscountEndDate,
                            DiscountStartDate = pp.DiscountStartDate,
                        })
                        .FirstOrDefault(),
                    ProductImg = p.ProductImg,
                    IsActive = p.IsActive,
                }).ToList();

                baseResponse.Status = StatusCodes.Status200OK;
                baseResponse.MessageShow = "Thành công";
                baseResponse.Data = productDTOs;


            }
            catch (Exception ex)
            {
                baseResponse.Status = StatusCodes.Status500InternalServerError;
                baseResponse.MessageHide = "Lỗi hệ thống: " + ex.Message;
                baseResponse.Data = null;
            }

            return baseResponse;
        }

        public async Task<BaseResponse> GetAllProductsForSaleAsync()
        {
                BaseResponse baseResponse  = new BaseResponse();
            try
            {
                var products = await productRepository.GetAllProductsForSaleAsync();
                List<ProductDTO> productDTOs = new List<ProductDTO>();

                if (products != null || products.Count != 0)
                {
                    productDTOs = products.Select(p => new ProductDTO
                    {
                        ProductId = p.ProductId,
                        ProductName = p.ProductName,
                        ProductTypeId = p.ProductTypeId,
                        BrandId = p.BrandId,
                        ProductPriceDTO = p.ProductPrices
                            .OrderByDescending(pp => pp.CreatedAt)
                            .Select(pp => new ProductPriceDTO
                            {
                                ProductPriceId = pp.ProductPriceId,
                                DiscountedPrice = pp.DiscountedPrice,
                                OriginalPrice = pp.OriginalPrice,
                                DiscountEndDate = pp.DiscountEndDate,
                                DiscountStartDate = pp.DiscountStartDate,
                                CreatedAt = pp.CreatedAt,
                                IsActive = pp.IsActive,
                            })
                            .FirstOrDefault(),
                        SizeDTOs = p.ProductSizes
                            .Select(ps => new SizeDTO
                            {
                                SizeId = ps.SizeId,
                                SizeName = ps.Size.SizeName,
                            }).ToList(),

                        Instruction = p.Instruction,
                        ProductImg = p.ProductImg,
                        IsActive = p.IsActive,
                    }).ToList();
                }

                baseResponse.Status = StatusCodes.Status200OK;
                baseResponse.MessageShow = "Thành công";
                baseResponse.Data = productDTOs;
                return baseResponse;
            }
            catch (Exception ex)
            {
                baseResponse.Status = StatusCodes.Status500InternalServerError;
                baseResponse.MessageHide = "Lỗi hệ thống: " + ex.Message;
                baseResponse.Data = null;
            }

            return baseResponse;
        }

        public async Task<BaseResponse?> AddNewProduct(AddProductRequest request)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                Product product = new Product
                {
                    ProductName = request.ProductName,
                    ProductTypeId = request.ProductTypeId,
                    BrandId = request.BrandId,
                    //Instruction = request.Instruction,
                    //ProductImg = request.ProductImg,
                    IsActive = true,
                    //IsOutstanding = request.IsOutstanding,
                };

                product = await productRepository.Add(product);

                if (request.HasSize == true)
                {
                    foreach (var sizeId in request.SizeIds)
                    {
                        ProductSize productSize = new ProductSize
                        {
                            ProductId = product.ProductId,
                            SizeId = sizeId,
                        };

                        await productSizeRepository.Add(productSize);
                    }
                }

                if (request.OriginalPrice != null && request.OriginalPrice > 0)
                {
                    ProductPrice productPrice = new ProductPrice
                    {
                        ProductId = product.ProductId,
                        OriginalPrice = request.OriginalPrice,
                        DiscountedPrice = request.DiscountedPrice,
                        DiscountStartDate = request.DiscountStartDate,
                        DiscountEndDate = request.DiscountEndDate,
                        IsActive = true,
                        CreatedAt = DateTime.Now,
                    };
                    await productPriceRepository.Add(productPrice);
                }

                if (request.Images != null && request.Images.Count > 0)
                {
                    foreach (var image in request.Images)
                    {
                        // Here you would normally upload the image to a storage service
                        // and get the URL. For simplicity, we'll just use the file name.
                        ProductImg productImg = new ProductImg
                        {
                            ProductId = product.ProductId,
                            ImgUrl = await CloudinaryHelper.UploadImageAsync(image),
                        };
                        await productImgRepository.Add(productImg);
                    }
                }


                return new BaseResponse
                {
                    Status = StatusCodes.Status200OK,
                    MessageShow = "Thêm sản phẩm thành công",
                    Data = product,
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return new BaseResponse
                {
                    Status = StatusCodes.Status500InternalServerError,
                    MessageHide = "Lỗi hệ thống: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
