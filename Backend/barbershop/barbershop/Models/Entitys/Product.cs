using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public int ProductTypeId { get; set; }

    public string? Instruction { get; set; }

    public bool? IsActive { get; set; }

    public int? SizeId { get; set; }

    public string? ProductImg { get; set; }

    public int? BrandId { get; set; }

    public virtual Brand? Brand { get; set; }

    public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();

    public virtual ICollection<PaymentService> PaymentServices { get; set; } = new List<PaymentService>();

    public virtual ICollection<ProductPrice> ProductPrices { get; set; } = new List<ProductPrice>();

    public virtual ProductType ProductType { get; set; } = null!;

    public virtual Size? Size { get; set; }
}
