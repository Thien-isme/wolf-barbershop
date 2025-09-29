using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class ProductPrice
{
    public long ProductPriceId { get; set; }

    public int ProductId { get; set; }

    public decimal OriginalPrice { get; set; }

    public decimal? DiscountedPrice { get; set; }

    public DateTime? DiscountStartDate { get; set; }

    public DateTime? DiscountEndDate { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Product Product { get; set; } = null!;
}
