using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class PaymentsMethod
{
    public int PaymentMethodId { get; set; }

    public string MethodName { get; set; } = null!;

    public string? ImgUrl { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
