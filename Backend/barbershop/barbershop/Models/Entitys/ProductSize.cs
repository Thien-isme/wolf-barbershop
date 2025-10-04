using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class ProductSize
{
    public int ProductSizeId { get; set; }

    public int ProductId { get; set; }

    public int? SizeId { get; set; }

    public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();

    public virtual Product Product { get; set; } = null!;

    public virtual Size? Size { get; set; }
}
