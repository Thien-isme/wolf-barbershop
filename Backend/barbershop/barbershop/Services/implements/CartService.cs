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
                Cart cart = new Cart
                {
                    UserId = int.Parse(userId),
                    ProductId = saveToCartRequest.ProductId,
                    IsAvailable = true,
                };

                if (saveToCartRequest.SizeId != null)
                {
                    cart.SizeId = saveToCartRequest.SizeId;
                }

                bool saveSuccessful = _cartRepository.Save(cart);
                Console.WriteLine("Save successful: " + saveSuccessful);
                if (saveSuccessful == true)
                {
                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Product added to cart successfully.",
                        MessageHide = "Product added to cart successfully.",
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
        }
    }
}
