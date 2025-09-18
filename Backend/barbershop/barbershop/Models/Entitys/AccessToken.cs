using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class AccessToken
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string AccessToken1 { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? RevokedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
