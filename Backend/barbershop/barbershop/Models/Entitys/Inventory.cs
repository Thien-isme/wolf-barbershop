using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Inventory
{
    public int InventoryId { get; set; }

    public int ProductSizeId { get; set; }

    public int? Quantity { get; set; }

    public DateTime? LastUpdated { get; set; }

    public virtual ProductSize ProductSize { get; set; } = null!;
}
