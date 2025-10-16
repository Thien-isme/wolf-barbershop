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

    public string? ProductImg { get; set; }

    public int? BrandId { get; set; }

    public bool? IsOutstanding { get; set; }

    public virtual ICollection<BranchesProduct> BranchesProducts { get; set; } = new List<BranchesProduct>();

    public virtual Brand? Brand { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; } = new List<InvoiceDetail>();

    public virtual ICollection<PaymentService> PaymentServices { get; set; } = new List<PaymentService>();

    public virtual ICollection<ProductPrice> ProductPrices { get; set; } = new List<ProductPrice>();

    public virtual ICollection<ProductSize> ProductSizes { get; set; } = new List<ProductSize>();

    public virtual ProductType ProductType { get; set; } = null!;
}
