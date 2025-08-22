using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class EmployeeImgHair
{
    public int EmployeeImgHairId { get; set; }

    public int EmployeeId { get; set; }

    public string? ImgUrl { get; set; }

    public bool? IsActive { get; set; }

    public virtual Employee Employee { get; set; } = null!;
}
