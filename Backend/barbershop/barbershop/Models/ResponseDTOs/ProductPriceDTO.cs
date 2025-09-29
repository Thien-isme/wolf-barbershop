
﻿using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class ProductPriceDTO
    {
        public long ProductPriceId { get; set; }

        public int ProductId { get; set; }

        public decimal OriginalPrice { get; set; }

        public decimal? DiscountedPrice { get; set; }

        public DateTime? DiscountStartDate { get; set; }

        public DateTime? DiscountEndDate { get; set; }

        public bool? IsActive { get; set; }

        public DateTime? CreatedAt { get; set; }

        public Product Product { get; set; } = null!;
    }
}
