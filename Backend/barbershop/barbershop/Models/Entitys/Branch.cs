using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Branch
{
    public int BranchId { get; set; }

    public string? ProvinceCity { get; set; }

    public string? WardCommune { get; set; }

    public string? LocationDetail { get; set; }

    public bool IsActive { get; set; }

    public string? BranchUrl { get; set; }

    public TimeOnly? TimeOn { get; set; }

    public TimeOnly? TimeOff { get; set; }

    public string? BranchName { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
