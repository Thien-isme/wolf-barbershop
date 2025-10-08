using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Cart
{
    public long CartId { get; set; }

    public long? UserId { get; set; }

    public int? ProductId { get; set; }

    public int? SizeId { get; set; }

    public bool? IsAvailable { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Size? Size { get; set; }

    public virtual User? User { get; set; }
}
