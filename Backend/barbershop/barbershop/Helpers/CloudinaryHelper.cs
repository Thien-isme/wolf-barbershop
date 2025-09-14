using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

public static class CloudinaryHelper
{
    private static readonly Cloudinary cloudinary = new Cloudinary(
        new Account("duzh5dnul", "511313553762856", "GAsZ5F746_YoJKQke9Qu-aj3GIY"));

    public static async Task<string?> UploadImageAsync(IFormFile file)
    {
        if (file == null)
            throw new ArgumentNullException(nameof(file), "File upload không được null!");

        using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream)
        };
        var uploadResult = await cloudinary.UploadAsync(uploadParams);
        return uploadResult.SecureUrl?.ToString();
    }
}