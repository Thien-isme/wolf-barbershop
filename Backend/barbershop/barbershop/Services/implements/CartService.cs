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

                if(cart == null) // Tạo mới nếu chưa có
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

                if(checkUpdate == true)
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
            try{
                // Lấy danh sách sản phẩm trong giỏ hàng của người dùng từ repository
                // Giả sử bạn có một phương thức trong CartRepository để lấy danh sách này
                var productsInCart = await _cartRepository.GetCartsByUserId(userId);

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
    }
}
