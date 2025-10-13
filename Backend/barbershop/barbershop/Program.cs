using barbershop.Services.implements;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Thêm dòng này để đăng ký Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{   
    c.OperationFilter<SwaggerFileOperationFilter>();
});

// Đăng ký AuthService vào DI container
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<CartService>();

// Cấu hình xác thực JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])),
        ClockSkew = TimeSpan.Zero // Không nới lỏng thời gian hết hạn
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("User", policy =>
        policy.RequireClaim("roleId", "1")); // 1 là roleId của admin
    options.AddPolicy("Barber", policy =>
        policy.RequireClaim("roleId", "2")); // 2 là roleId của manager
    options.AddPolicy("Cashier", policy =>
        policy.RequireClaim("roleId", "3")); // 2 là roleId của manager
    options.AddPolicy("Manager", policy =>
        policy.RequireClaim("roleId", "4")); // 2 là roleId của manager
    // Thêm các policy khác nếu cần
    options.AddPolicy("BarberOrManager", policy =>
        policy.RequireAssertion(context =>
            context.User.HasClaim(c => c.Type == "RoleId" && (c.Value == "2" || c.Value == "4"))
        ));
});

builder.Services.AddSwaggerGen(c =>
{
    c.OperationFilter<SwaggerFileOperationFilter>();

    // Thêm cấu hình JWT Bearer
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = "Nhập token vào đây: Bearer {token}",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();
app.UseCors(builder =>
    builder.WithOrigins("http://localhost:5173", "https://thien-isme.github.io", "http://localhost:5174")
           .AllowAnyMethod()
           .AllowAnyHeader());



//app.UseHttpsRedirection();

// Thêm dòng này để bật xác thực
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Thêm đoạn này để bật Swagger UI ở môi trường phát triển
app.UseSwagger();
app.UseSwaggerUI();

app.Run();