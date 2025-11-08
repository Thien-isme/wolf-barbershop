using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class CartService
    {
        private readonly CartRepository _cartRepository;
        public CartService()
        {
            _cartRepository = new CartRepository();
        }

        public async Task<BaseResponse?> SaveToCart(SaveToCartRequest saveToCartRequest, string? userId)
        {
            try
            {
                var cart = await _cartRepository.GetCartByUserIdAndProductId(userId, saveToCartRequest.ProductId);

                if (cart == null) // Tạo mới nếu chưa có
                {
                    Cart newCart = new Cart
                    {
                        UserId = int.Parse(userId),
                        ProductId = saveToCartRequest.ProductId,
                        Quantity = saveToCartRequest.Quantity,
                    };
                    await _cartRepository.Save(newCart);

                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Product added to cart successfully.",
                        MessageHide = "Product added to cart successfully.",
                        Data = null
                    };
                }

                // Cập nhật số lượng nếu đã có
                cart.Quantity += saveToCartRequest.Quantity;
                bool checkUpdate = await _cartRepository.UpdateQuantity(cart);

                if (checkUpdate == true)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Product quantity updated in cart successfully.",
                        MessageHide = "Product quantity updated in cart successfully.",
                        Data = null
                    };
                }


            }
            catch (Exception ex)
            {
                return new BaseResponse
                {
                    Status = 500, // hoặc 500 nếu là lỗi hệ thống
                    MessageShow = "Thêm sản phẩm vào giỏ hàng thất bại.",
                    MessageHide = ex.Message,
                    Data = null
                };
            }

            return new BaseResponse
            {
                Status = 500, // hoặc 500 nếu là lỗi hệ thống
                MessageShow = "Thêm sản phẩm vào giỏ hàng thất bại.",
                MessageHide = "Thêm sản phẩm vào giỏ hàng thất bại.",
                Data = null
            };
        }

        public async Task<BaseResponse?> GetProductInCartsOfUser(string? userId)
        {
            try {
                // Lấy danh sách sản phẩm trong giỏ hàng của người dùng từ repository
                // Giả sử bạn có một phương thức trong CartRepository để lấy danh sách này
                var productsInCart = await _cartRepository.GetProductInCartsOfUser(userId);

                if (productsInCart == null)
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "No products found in cart.",
                        MessageHide = "No products found in cart.",
                        Data = null
                    };
                }


                List<CartDTO> cartDTOs = productsInCart.Select(cart => new CartDTO
                {
                    CartId = cart.CartId,
                    UserId = cart.UserId,
                    ProductId = cart.ProductId,
                    SizeId = cart.SizeId,
                    SizeName = cart.Size?.SizeName,
                    Quantity = cart.Quantity,
                    ProductDTO = cart.Product == null ? null : new ProductDTO
                    {
                        ProductId = cart.Product.ProductId,
                        ProductName = cart.Product.ProductName,
                        ProductImg = cart.Product.ProductImg,
                    },
                    ProductPriceDTO = cart.Product.ProductPrices
                        .OrderByDescending(pp => pp.ProductPriceId) // Lấy giá mới nhất
                        .Select(pp => new ProductPriceDTO
                        {
                            DiscountedPrice = pp.DiscountedPrice,
                            OriginalPrice = pp.OriginalPrice,
                            DiscountStartDate = pp.DiscountStartDate,
                            DiscountEndDate = pp.DiscountEndDate,
                        })
                        .FirstOrDefault(),
                }).ToList();

                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Products retrieved successfully.",
                    MessageHide = "Products retrieved successfully.",
                    Data = cartDTOs
                };

            }
            catch (Exception ex)
            {
                return new BaseResponse
                {
                    Status = 500, // hoặc 500 nếu là lỗi hệ thống
                    MessageShow = "Failed to retrieve products in cart.",
                    MessageHide = ex.Message,
                    Data = null
                };
            }
        }

        public async Task<BaseResponse?> CountProductInCart(string? userId)
        {
            try
            {
                var count = await _cartRepository.CountProductsInCartByUserId(userId);

                if (count == null)
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "No products found in cart.",
                        MessageHide = "No products found in cart.",
                        Data = new CountProductsDTO { Count = 0 }
                    };
                }

                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Count retrieved successfully.",
                    MessageHide = "Count retrieved successfully.",
                    Data = new CountProductsDTO { Count = count }
                };


            }
            catch (Exception ex) {
                return new BaseResponse
                {
                    Status = 500, // hoặc 500 nếu là lỗi hệ thống
                    MessageShow = "Failed to retrieve count of products in cart.",
                    MessageHide = ex.Message,
                    Data = null
                };
            }
        }

        public async Task<BaseResponse> PlusQuantityInCart(PlusOrSubQuantityProductInCartRequest request)
        {
            try
            {
                _cartRepository.BeginTransaction();

                Cart? cartEntity = await _cartRepository.GetCartByCartId(request.CartId);
                if (cartEntity == null)
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "Cart not found.",
                        MessageHide = "Cart not found.",
                        Data = null
                    };
                }

                cartEntity.Quantity += request.Quantity;
                Console.WriteLine("cartEntity.Quantity: " + cartEntity.Quantity);
                bool checkUpdate = await _cartRepository.UpdateQuantity(cartEntity);
                if (checkUpdate == true)
                {
                    Cart? cartEntityAfter = await _cartRepository.GetCartByCartId(request.CartId);
                    Console.WriteLine("cartEntityAfter.Quantity: " + cartEntityAfter?.Quantity);
                    _cartRepository.CommitTransaction();
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Cart quantity updated successfully.",
                        MessageHide = "Cart quantity updated successfully.",
                        Data = null
                    };
                }



                _cartRepository.RollbackTransaction();
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "Failed to update cart quantity.",
                    MessageHide = "Failed to update cart quantity.",
                    Data = null
                };

            }
            catch
            {
                _cartRepository.RollbackTransaction();
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "An error occurred while updating cart quantity.",
                    MessageHide = "An error occurred while updating cart quantity.",
                    Data = null
                };
            }
        }

        public async Task<BaseResponse> SubQuantityInCart(PlusOrSubQuantityProductInCartRequest request)
        {
            try
            {
                _cartRepository.BeginTransaction();

                Cart? cartEntity = await _cartRepository.GetCartByCartId(request.CartId);
                if (cartEntity == null)
                {
                    return new BaseResponse
                    {
                        Status = 404,
                        MessageShow = "Cart not found.",
                        MessageHide = "Cart not found.",
                        Data = null
                    };
                }

                cartEntity.Quantity -= request.Quantity;
                Console.WriteLine("cartEntity.Quantity: " + cartEntity.Quantity);
                bool checkUpdate = await _cartRepository.UpdateQuantity(cartEntity);
                if (checkUpdate == true)
                {
                    Cart? cartEntityAfter = await _cartRepository.GetCartByCartId(request.CartId);
                    Console.WriteLine("cartEntityAfter.Quantity: " + cartEntityAfter?.Quantity);
                    _cartRepository.CommitTransaction();
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Cart quantity updated successfully.",
                        MessageHide = "Cart quantity updated successfully.",
                        Data = null
                    };
                }



                _cartRepository.RollbackTransaction();
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "Failed to update cart quantity.",
                    MessageHide = "Failed to update cart quantity.",
                    Data = null
                };

            }
            catch
            {
                _cartRepository.RollbackTransaction();
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "An error occurred while updating cart quantity.",
                    MessageHide = "An error occurred while updating cart quantity.",
                    Data = null
                };
            }
        }

        public async Task<BaseResponse> RemoveProductInCart(long cartId)
        {
            try
            {
                _cartRepository.BeginTransaction();
                bool checkDelete =  await _cartRepository.DeleteProductInCart(cartId);
                if (checkDelete == true)
                {
                    _cartRepository.CommitTransaction();
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Product removed from cart successfully.",
                        MessageHide = "Product removed from cart successfully.",
                        Data = null
                    };
                }
                _cartRepository.RollbackTransaction();
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "Failed to remove product from cart.",
                    MessageHide = "Failed to remove product from cart.",
                    Data = null
                };
            }
            catch (Exception ex)
            {
                _cartRepository.RollbackTransaction();
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "An error occurred while removing product from cart.",
                    MessageHide = ex.Message,
                    Data = null
                };
            }
        } 
    }
}
