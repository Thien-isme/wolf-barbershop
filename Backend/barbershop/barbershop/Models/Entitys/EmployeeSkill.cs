using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class EmployeeSkill
{
    public int EmployeeSkillId { get; set; }

    public int EmployeeId { get; set; }

    public int SkillId { get; set; }

    public bool IsActive { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual Skill Skill { get; set; } = null!;
}
