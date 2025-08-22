using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class ServiceType
{
    public int ServiceTypeId { get; set; }

    public string ServiceTypeName { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual ICollection<Service> Services { get; set; } = new List<Service>();
}
