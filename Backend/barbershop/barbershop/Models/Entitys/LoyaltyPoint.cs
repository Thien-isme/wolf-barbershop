using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class LoyaltyPoint
{
    public int LoyaltyPointsId { get; set; }

    public long UserId { get; set; }

    public int? TotalPoints { get; set; }

    public DateTime? LastUpdated { get; set; }

    public virtual User User { get; set; } = null!;
}
