using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class BranchesProduct
{
    public int BranchesProducts { get; set; }

    public int? BranchId { get; set; }

    public int? ProductId { get; set; }

    public int? Quantity { get; set; }

    public int? SizeId { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual Branch? Branch { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Size? Size { get; set; }
}
