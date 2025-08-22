using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Location
{
    public int LocationId { get; set; }

    public string ProvinceCity { get; set; } = null!;

    public string WardCommune { get; set; } = null!;

    public string? LocationDetail { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
