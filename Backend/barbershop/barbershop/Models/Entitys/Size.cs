using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Size
{
    public int SizeId { get; set; }

    public string SizeName { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<ProductSize> ProductSizes { get; set; } = new List<ProductSize>();
}
