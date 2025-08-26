using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class EmployeeRole
{
    public int EmployeeRoleId { get; set; }

    public string EmployeeRoleName { get; set; } = null!;

    public bool? IsActive { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
