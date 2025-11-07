using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class ProductImg
{
    public int ProductImg1 { get; set; }

    public int? ProductId { get; set; }

    public string? ImgUrl { get; set; }

    public bool? IsActive { get; set; }

    public virtual Product? Product { get; set; }
}
