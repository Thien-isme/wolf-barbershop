var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Thêm dòng này để đăng ký Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{   
    c.OperationFilter<SwaggerFileOperationFilter>();
});

var app = builder.Build();  

//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Thêm đoạn này để bật Swagger UI ở môi trường phát triển
app.UseSwagger();
app.UseSwaggerUI();

app.Run();