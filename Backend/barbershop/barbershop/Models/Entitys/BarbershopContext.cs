using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Models.Entitys;

public partial class BarbershopContext : DbContext
{
    public BarbershopContext()
    {
    }

    public BarbershopContext(DbContextOptions<BarbershopContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AccessToken> AccessTokens { get; set; }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<AppointmentService> AppointmentServices { get; set; }

    public virtual DbSet<Branch> Branchs { get; set; }

    public virtual DbSet<BranchesProduct> BranchesProducts { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<EmployeeImgHair> EmployeeImgHairs { get; set; }

    public virtual DbSet<EmployeeSkill> EmployeeSkills { get; set; }

    public virtual DbSet<Inventory> Inventories { get; set; }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<InvoiceDetail> InvoiceDetails { get; set; }

    public virtual DbSet<LoyaltyPoint> LoyaltyPoints { get; set; }

    public virtual DbSet<PaymentService> PaymentServices { get; set; }

    public virtual DbSet<PaymentsMethod> PaymentsMethods { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductPrice> ProductPrices { get; set; }

    public virtual DbSet<ProductSize> ProductSizes { get; set; }

    public virtual DbSet<ProductType> ProductTypes { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<ServiceType> ServiceTypes { get; set; }

    public virtual DbSet<Size> Sizes { get; set; }

    public virtual DbSet<Skill> Skills { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserVoucher> UserVouchers { get; set; }

    public virtual DbSet<Voucher> Vouchers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local);Database=barbershop;uid=sa;pwd=12345;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AccessToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__access_t__3213E83F905EE060");

            entity.ToTable("access_tokens");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccessToken1)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("access_token");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpiresAt)
                .HasColumnType("datetime")
                .HasColumnName("expires_at");
            entity.Property(e => e.RevokedAt)
                .HasColumnType("datetime")
                .HasColumnName("revoked_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.AccessTokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__access_to__user___787EE5A0");
        });

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.ToTable("appointments");

            entity.HasIndex(e => e.BarberId, "IX_appointments_barber_id");

            entity.HasIndex(e => e.BranchId, "IX_appointments_branch_id");

            entity.HasIndex(e => e.UserId, "IX_appointments_user_id");

            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.AppointmentDate).HasColumnName("appointment_date");
            entity.Property(e => e.AppointmentTime)
                .HasPrecision(0)
                .HasColumnName("appointment_time");
            entity.Property(e => e.BarberId).HasColumnName("barber_id");
            entity.Property(e => e.BranchId).HasColumnName("branch_id");
            entity.Property(e => e.CreatedAt)
                .HasPrecision(0)
                .HasColumnName("created_at");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Note).HasColumnName("note");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Barber).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.BarberId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_appointments_barber_id");

            entity.HasOne(d => d.Branch).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.BranchId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_appointments_location_id");

            entity.HasOne(d => d.User).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_appointments_user_id");
        });

        modelBuilder.Entity<AppointmentService>(entity =>
        {
            entity.ToTable("appointment_service");

            entity.HasIndex(e => e.AppointmentId, "IX_appointment_service_appointment_id");

            entity.HasIndex(e => e.ServiceId, "IX_appointment_service_service_id");

            entity.Property(e => e.AppointmentServiceId).HasColumnName("appointment_service_id");
            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.ServiceId).HasColumnName("service_id");

            entity.HasOne(d => d.Appointment).WithMany(p => p.AppointmentServices)
                .HasForeignKey(d => d.AppointmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_appointment_service_appointment_id");

            entity.HasOne(d => d.Service).WithMany(p => p.AppointmentServices)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_appointment_service_service_id");
        });

        modelBuilder.Entity<Branch>(entity =>
        {
            entity.HasKey(e => e.BranchId).HasName("PK_locations");

            entity.ToTable("branchs");

            entity.Property(e => e.BranchId).HasColumnName("branch_id");
            entity.Property(e => e.BranchName)
                .HasMaxLength(255)
                .HasColumnName("branch_name");
            entity.Property(e => e.BranchUrl)
                .HasMaxLength(255)
                .HasColumnName("branch_url");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.LocationDetail)
                .HasMaxLength(255)
                .HasColumnName("location_detail");
            entity.Property(e => e.ProvinceCity)
                .HasMaxLength(255)
                .HasColumnName("province_city");
            entity.Property(e => e.TimeOff).HasColumnName("time_off");
            entity.Property(e => e.TimeOn).HasColumnName("time_on");
            entity.Property(e => e.WardCommune)
                .HasMaxLength(255)
                .HasColumnName("ward_commune");
        });

        modelBuilder.Entity<BranchesProduct>(entity =>
        {
            entity.HasKey(e => e.BranchesProductId).HasName("PK__branches__78799D88D947A72A");

            entity.ToTable("branches_products");

            entity.Property(e => e.BranchesProductId).HasColumnName("branches_product_id");
            entity.Property(e => e.BranchId).HasColumnName("branch_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.SizeId)
                .HasDefaultValue(1)
                .HasColumnName("size_id");
            entity.Property(e => e.UpdateAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("update_at");

            entity.HasOne(d => d.Branch).WithMany(p => p.BranchesProducts)
                .HasForeignKey(d => d.BranchId)
                .HasConstraintName("FK__branches___branc__7E37BEF6");

            entity.HasOne(d => d.Product).WithMany(p => p.BranchesProducts)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__branches___produ__7F2BE32F");

            entity.HasOne(d => d.Size).WithMany(p => p.BranchesProducts)
                .HasForeignKey(d => d.SizeId)
                .HasConstraintName("FK__branches___size___00200768");
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.BrandId).HasName("PK__brands__5E5A8E27CF8E045D");

            entity.ToTable("brands");

            entity.Property(e => e.BrandId).HasColumnName("brand_id");
            entity.Property(e => e.BrandName)
                .HasMaxLength(100)
                .HasColumnName("brandName");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("description");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("isActive");
            entity.Property(e => e.LogoPath)
                .HasMaxLength(255)
                .HasColumnName("logoPath");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.ToTable("carts");

            entity.Property(e => e.CartId).HasColumnName("cart_id");
            entity.Property(e => e.IsAvailable)
                .HasDefaultValue(true)
                .HasColumnName("is_available");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.SizeId).HasColumnName("size_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Product).WithMany(p => p.Carts)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__carts__product_i__01142BA1");

            entity.HasOne(d => d.Size).WithMany(p => p.Carts)
                .HasForeignKey(d => d.SizeId)
                .HasConstraintName("FK_carts_product_sizes");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__carts__user_id__02084FDA");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.ToTable("employees");

            entity.HasIndex(e => e.BranchId, "IX_employees_branch_id");

            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.AvatarUrl)
                .HasMaxLength(255)
                .HasColumnName("avatar_url");
            entity.Property(e => e.BranchId).HasColumnName("branch_id");
            entity.Property(e => e.ExperienceYears).HasColumnName("experience_years");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.QuantityRate)
                .HasDefaultValue(0)
                .HasColumnName("quantity_rate");
            entity.Property(e => e.Rating)
                .HasDefaultValue(0.0m)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("rating");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Branch).WithMany(p => p.Employees)
                .HasForeignKey(d => d.BranchId)
                .HasConstraintName("FK_employees_location_id");

            entity.HasOne(d => d.User).WithMany(p => p.Employees)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Employee_User");
        });

        modelBuilder.Entity<EmployeeImgHair>(entity =>
        {
            entity.HasKey(e => e.EmployeeImgHairId).HasName("employee_img_hair_employee_img_hair_id_primary");

            entity.ToTable("employee_img_hair");

            entity.HasIndex(e => e.EmployeeId, "IX_employee_img_hair_employee_id");

            entity.Property(e => e.EmployeeImgHairId)
                .ValueGeneratedNever()
                .HasColumnName("employee_img_hair_id");
            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(255)
                .HasColumnName("img_url");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("('1')")
                .HasColumnName("is_active");
            entity.Property(e => e.IsOutstanding)
                .HasDefaultValue(false)
                .HasColumnName("is_outstanding");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeImgHairs)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("employee_img_hair_img_url_foreign");
        });

        modelBuilder.Entity<EmployeeSkill>(entity =>
        {
            entity.ToTable("employee_skill");

            entity.HasIndex(e => e.EmployeeId, "IX_employee_skill_employee_id");

            entity.HasIndex(e => e.SkillId, "IX_employee_skill_skill_id");

            entity.Property(e => e.EmployeeSkillId).HasColumnName("employee_skill_id");
            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.SkillId).HasColumnName("skill_id");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeSkills)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_employee_skill_employee_id");

            entity.HasOne(d => d.Skill).WithMany(p => p.EmployeeSkills)
                .HasForeignKey(d => d.SkillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_employee_skill_skill_id");
        });

        modelBuilder.Entity<Inventory>(entity =>
        {
            entity.HasKey(e => e.InventoryId).HasName("PK__inventor__B59ACC492665C466");

            entity.ToTable("inventory");

            entity.Property(e => e.InventoryId).HasColumnName("inventory_id");
            entity.Property(e => e.LastUpdated)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("last_updated");
            entity.Property(e => e.ProductSizeId).HasColumnName("product_size_id");
            entity.Property(e => e.Quantity)
                .HasDefaultValue(0)
                .HasColumnName("quantity");

            entity.HasOne(d => d.ProductSize).WithMany(p => p.Inventories)
                .HasForeignKey(d => d.ProductSizeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__inventory__produ__08B54D69");
        });

        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.HasKey(e => e.InvoiceId).HasName("PK_payments");

            entity.ToTable("invoices");

            entity.HasIndex(e => e.AppointmentId, "IX_payments_appointment_id");

            entity.HasIndex(e => e.CashierId, "IX_payments_casher_id");

            entity.HasIndex(e => e.CustomerId, "IX_payments_customer_id");

            entity.HasIndex(e => e.PaymentMethodId, "IX_payments_payment_method_id");

            entity.HasIndex(e => e.VoucherId, "IX_payments_voucher_id");

            entity.Property(e => e.InvoiceId).HasColumnName("invoice_id");
            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.CashierId).HasColumnName("cashier_id");
            entity.Property(e => e.CreatedAt)
                .HasPrecision(0)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.ExpdateDate)
                .HasPrecision(0)
                .HasColumnName("expdate_date");
            entity.Property(e => e.IsAppointment).HasColumnName("is_appointment");
            entity.Property(e => e.PaymentMethodId).HasColumnName("payment_method_id");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.Subtotal)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("subtotal");
            entity.Property(e => e.Total)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("total");
            entity.Property(e => e.VoucherId).HasColumnName("voucher_id");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.AppointmentId)
                .HasConstraintName("FK_payments_appointment_id");

            entity.HasOne(d => d.Cashier).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.CashierId)
                .HasConstraintName("FK_payments_casher_id");

            entity.HasOne(d => d.Customer).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_payments_customer_id");

            entity.HasOne(d => d.PaymentMethod).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.PaymentMethodId)
                .HasConstraintName("FK_payments_payment_method_id");

            entity.HasOne(d => d.Voucher).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.VoucherId)
                .HasConstraintName("FK_payments_voucher_id");
        });

        modelBuilder.Entity<InvoiceDetail>(entity =>
        {
            entity.HasKey(e => e.InvoiceDetailId).HasName("PK__invoice___84908DB65FC121BC");

            entity.ToTable("invoice_detail");

            entity.Property(e => e.InvoiceDetailId).HasColumnName("invoice_detail_id");
            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.InvoiceId).HasColumnName("invoice_id");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.ServiceId).HasColumnName("service_id");
            entity.Property(e => e.SizeId).HasColumnName("sizeId");

            entity.HasOne(d => d.Employee).WithMany(p => p.InvoiceDetails)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK__invoice_d__emplo__3587F3E0");

            entity.HasOne(d => d.Invoice).WithMany(p => p.InvoiceDetails)
                .HasForeignKey(d => d.InvoiceId)
                .HasConstraintName("FK__invoice_d__invoi__32AB8735");

            entity.HasOne(d => d.Product).WithMany(p => p.InvoiceDetails)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__invoice_d__produ__3493CFA7");

            entity.HasOne(d => d.Service).WithMany(p => p.InvoiceDetails)
                .HasForeignKey(d => d.ServiceId)
                .HasConstraintName("FK__invoice_d__servi__339FAB6E");

            entity.HasOne(d => d.Size).WithMany(p => p.InvoiceDetails)
                .HasForeignKey(d => d.SizeId)
                .HasConstraintName("FK__invoice_d__sizeI__3C34F16F");
        });

        modelBuilder.Entity<LoyaltyPoint>(entity =>
        {
            entity.HasKey(e => e.LoyaltyPointsId).HasName("PK__loyalty___CC34CC067EF3250F");

            entity.ToTable("loyalty_points");

            entity.HasIndex(e => e.UserId, "uq_user_loyalty").IsUnique();

            entity.Property(e => e.LoyaltyPointsId).HasColumnName("loyalty_points_id");
            entity.Property(e => e.LastUpdated)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("last_updated");
            entity.Property(e => e.TotalPoints)
                .HasDefaultValue(0)
                .HasColumnName("total_points");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithOne(p => p.LoyaltyPoint)
                .HasForeignKey<LoyaltyPoint>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LoyaltyPoints_Users");
        });

        modelBuilder.Entity<PaymentService>(entity =>
        {
            entity.ToTable("payment_service");

            entity.HasIndex(e => e.BarberId, "IX_payment_service_barber_id");

            entity.HasIndex(e => e.PaymentId, "IX_payment_service_payment_id");

            entity.HasIndex(e => e.ProductId, "IX_payment_service_product_id");

            entity.HasIndex(e => e.ServiceId, "IX_payment_service_service_id");

            entity.Property(e => e.PaymentServiceId).HasColumnName("payment_service_id");
            entity.Property(e => e.BarberId).HasColumnName("barber_id");
            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("price");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.ServiceId).HasColumnName("service_id");

            entity.HasOne(d => d.Barber).WithMany(p => p.PaymentServices)
                .HasForeignKey(d => d.BarberId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_payment_service_barber_id");

            entity.HasOne(d => d.Payment).WithMany(p => p.PaymentServices)
                .HasForeignKey(d => d.PaymentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_payment_service_payment_id");

            entity.HasOne(d => d.Product).WithMany(p => p.PaymentServices)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_payment_service_product_id");

            entity.HasOne(d => d.Service).WithMany(p => p.PaymentServices)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_payment_service_service_id");
        });

        modelBuilder.Entity<PaymentsMethod>(entity =>
        {
            entity.HasKey(e => e.PaymentMethodId);

            entity.ToTable("payments_method");

            entity.Property(e => e.PaymentMethodId).HasColumnName("payment_method_id");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(255)
                .HasColumnName("img_url");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.MethodName)
                .HasMaxLength(255)
                .HasColumnName("method_name");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("products");

            entity.HasIndex(e => e.ProductTypeId, "IX_products_product_type_id");

            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.BrandId).HasColumnName("brand_id");
            entity.Property(e => e.Instruction).HasColumnName("instruction");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.IsOutstanding)
                .HasDefaultValue(false)
                .HasColumnName("is_outstanding");
            entity.Property(e => e.ProductImg)
                .HasMaxLength(255)
                .HasColumnName("product_img");
            entity.Property(e => e.ProductName)
                .HasMaxLength(255)
                .HasColumnName("product_name");
            entity.Property(e => e.ProductTypeId).HasColumnName("product_type_id");

            entity.HasOne(d => d.Brand).WithMany(p => p.Products)
                .HasForeignKey(d => d.BrandId)
                .HasConstraintName("FK_Product_Brand");

            entity.HasOne(d => d.ProductType).WithMany(p => p.Products)
                .HasForeignKey(d => d.ProductTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_products_product_type_id");
        });

        modelBuilder.Entity<ProductPrice>(entity =>
        {
            entity.HasKey(e => e.ProductPriceId).HasName("PK__product___DC88EB61E6F78191");

            entity.ToTable("product_prices");

            entity.Property(e => e.ProductPriceId).HasColumnName("product_price_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DiscountEndDate).HasColumnType("datetime");
            entity.Property(e => e.DiscountStartDate).HasColumnType("datetime");
            entity.Property(e => e.DiscountedPrice).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.OriginalPrice).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.ProductId).HasColumnName("product_id");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductPrices)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__product_p__produ__1332DBDC");
        });

        modelBuilder.Entity<ProductSize>(entity =>
        {
            entity.HasKey(e => e.ProductSizeId).HasName("PK__product___062A9A686F8A252C");

            entity.ToTable("product_sizes");

            entity.Property(e => e.ProductSizeId).HasColumnName("product_size_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.SizeId).HasColumnName("size_id");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductSizes)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__product_s__produ__14270015");

            entity.HasOne(d => d.Size).WithMany(p => p.ProductSizes)
                .HasForeignKey(d => d.SizeId)
                .HasConstraintName("FK__product_s__size___151B244E");
        });

        modelBuilder.Entity<ProductType>(entity =>
        {
            entity.ToTable("product_type");

            entity.Property(e => e.ProductTypeId).HasColumnName("product_type_id");
            entity.Property(e => e.ProductTypeName)
                .HasMaxLength(255)
                .HasColumnName("product_type_name");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__refresh___3213E83F2CB98DC3");

            entity.ToTable("refresh_tokens");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpiresAt)
                .HasColumnType("datetime")
                .HasColumnName("expires_at");
            entity.Property(e => e.RefreshToken1)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("refresh_token");
            entity.Property(e => e.RevokedAt)
                .HasColumnType("datetime")
                .HasColumnName("revoked_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__refresh_t__user___17F790F9");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.ReviewId).HasName("reviews_review_id_primary");

            entity.ToTable("reviews");

            entity.HasIndex(e => e.AppointmentId, "IX_reviews_appointment_id");

            entity.Property(e => e.ReviewId)
                .ValueGeneratedNever()
                .HasColumnName("review_id");
            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.Comment).HasColumnName("comment");
            entity.Property(e => e.CreateAt)
                .HasColumnType("datetime")
                .HasColumnName("create_at");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(255)
                .HasColumnName("img_url");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("('1')")
                .HasColumnName("is_active");
            entity.Property(e => e.Rate).HasColumnName("rate");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.AppointmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("appointment_id_foreign");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("roles_role_id_primary");

            entity.ToTable("roles");

            entity.Property(e => e.RoleId)
                .ValueGeneratedNever()
                .HasColumnName("role_id");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.RoleName)
                .HasMaxLength(255)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.ToTable("services");

            entity.HasIndex(e => e.ServiceTypeId, "IX_services_service_type_id");

            entity.Property(e => e.ServiceId).HasColumnName("service_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.DurationMin).HasColumnName("duration_min");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.IsOutstanding)
                .HasDefaultValue(false)
                .HasColumnName("is_outstanding");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("price");
            entity.Property(e => e.ServiceImage)
                .HasColumnType("text")
                .HasColumnName("service_image");
            entity.Property(e => e.ServiceName)
                .HasMaxLength(255)
                .HasColumnName("service_name");
            entity.Property(e => e.ServiceTypeId).HasColumnName("service_type_id");

            entity.HasOne(d => d.ServiceType).WithMany(p => p.Services)
                .HasForeignKey(d => d.ServiceTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_service_serviceType");
        });

        modelBuilder.Entity<ServiceType>(entity =>
        {
            entity.HasKey(e => e.ServiceTypeId).HasName("PK__service___288B52C6420CDE14");

            entity.ToTable("service_type");

            entity.Property(e => e.ServiceTypeId).HasColumnName("service_type_id");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.ServiceTypeName)
                .HasMaxLength(255)
                .HasColumnName("service_type_name");
        });

        modelBuilder.Entity<Size>(entity =>
        {
            entity.HasKey(e => e.SizeId).HasName("PK__sizes__0DCACE31F2CAB90D");

            entity.ToTable("sizes");

            entity.Property(e => e.SizeId).HasColumnName("size_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("isActive");
            entity.Property(e => e.SizeName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("sizeName");
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.ToTable("skills");

            entity.Property(e => e.SkillId).HasColumnName("skill_id");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.SkillName)
                .HasMaxLength(255)
                .HasColumnName("skill_name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");

            entity.HasIndex(e => e.RoleId, "IX_users_role_id");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.AvatarUrl)
                .HasColumnType("text")
                .HasColumnName("avatar_url");
            entity.Property(e => e.Cccd)
                .HasMaxLength(255)
                .HasColumnName("cccd");
            entity.Property(e => e.CreateAt)
                .HasPrecision(0)
                .HasColumnName("create_at");
            entity.Property(e => e.Dob).HasColumnName("dob");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("full_name");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .HasColumnName("phone");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.UpdatedAt)
                .HasPrecision(0)
                .HasColumnName("updated_at");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("roles_role_id_foreign");
        });

        modelBuilder.Entity<UserVoucher>(entity =>
        {
            entity.HasKey(e => e.UserVoucherId).HasName("PK__user_vou__6A698A796CBF9555");

            entity.ToTable("user_voucher");

            entity.Property(e => e.UserVoucherId).HasColumnName("user_voucher_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.VoucherId).HasColumnName("voucher_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserVouchers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_User_voucher_User");

            entity.HasOne(d => d.Voucher).WithMany(p => p.UserVouchers)
                .HasForeignKey(d => d.VoucherId)
                .HasConstraintName("FK_User_Voucher_Voucher");
        });

        modelBuilder.Entity<Voucher>(entity =>
        {
            entity.ToTable("vouchers");

            entity.Property(e => e.VoucherId).HasColumnName("voucher_id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.DiscountType)
                .HasMaxLength(255)
                .HasColumnName("discount_type");
            entity.Property(e => e.DiscountValue)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("discount_value");
            entity.Property(e => e.Expdate)
                .HasPrecision(0)
                .HasColumnName("expdate");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.MaxDiscount)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("max_discount");
            entity.Property(e => e.MinOrderValue)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("min_order_value");
            entity.Property(e => e.Startdate)
                .HasPrecision(0)
                .HasColumnName("startdate");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasColumnName("status");
            entity.Property(e => e.UsageLimit).HasColumnName("usage_limit");
            entity.Property(e => e.UsedCount)
                .HasDefaultValue(0)
                .HasColumnName("used_count");
            entity.Property(e => e.VoucherCode)
                .HasMaxLength(255)
                .HasColumnName("voucher_code");
            entity.Property(e => e.VoucherImg)
                .HasColumnType("text")
                .HasColumnName("voucher_img");
            entity.Property(e => e.VoucherName)
                .HasMaxLength(255)
                .HasColumnName("voucher_name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
