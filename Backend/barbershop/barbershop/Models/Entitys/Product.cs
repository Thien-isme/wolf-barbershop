using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public int ProductTypeId { get; set; }

    public decimal Price { get; set; }

    public int Discount { get; set; }

    public string? Instruction { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();

    public virtual ICollection<PaymentService> PaymentServices { get; set; } = new List<PaymentService>();

    public virtual ProductType ProductType { get; set; } = null!;
}
