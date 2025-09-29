using Azure.Core;
using barbershop.Helpers;
using barbershop.Models.Entitys;
using barbershop.Models.ResponseDTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.ObjectPool;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AccessToken = barbershop.Models.Entitys.AccessToken;
using RefreshToken = barbershop.Models.Entitys.RefreshToken;
using TokenValidationResult = barbershop.Models.ResponseDTOs.TokenValidationResult;
namespace barbershop.Services.implements
{
    public class TokenService
    {
        private readonly IConfiguration _configuration;
        private readonly BarbershopContext _context = new BarbershopContext();

        public TokenService()
        {
        }

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> GenerateAccessToken(User user, string secretKey, string issuer, string audience, int expireDays = 1)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim("FullName", user.FullName ?? ""),
                new Claim("RoleId", user.RoleId.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(expireDays),
                signingCredentials: creds);

            string accessToken = new JwtSecurityTokenHandler().WriteToken(token);

            // Khởi tạo DbContext mới cho mỗi request
            using (var context = new BarbershopContext())
            {
                var accessTokenEntity = new AccessToken
                {
                    AccessToken1 = accessToken,
                    UserId = user.UserId,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddMinutes(expireDays),
                    RevokedAt = null
                };
                context.AccessTokens.Add(accessTokenEntity);
                await context.SaveChangesAsync();
            }
            return accessToken;
        }

        public async Task<string> GenerateRefreshToken(User user, string secretKey, string issuer, string audience, int expireDays = 7)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim("FullName", user.FullName ?? ""),
                new Claim("RoleId", user.RoleId.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expireDays),
                signingCredentials: creds);

            string refreshToken = new JwtSecurityTokenHandler().WriteToken(token);
            
            // Khởi tạo DbContext mới cho mỗi request
            using (var context = new BarbershopContext())
            {
                var refreshTokenEntity = new RefreshToken
                {
                    RefreshToken1 = refreshToken,
                    UserId = user.UserId,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddMinutes(expireDays),
                    RevokedAt = null
                };
                context.RefreshTokens.Add(refreshTokenEntity);
                await context.SaveChangesAsync();
            }

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<TokenValidationResult> ValidateAccessToken(string token)
        {
            var tokenCheck = await _context.AccessTokens
                .FirstOrDefaultAsync(t => t.AccessToken1 == token);

            if (tokenCheck == null)
                return new TokenValidationResult { IsValid = false, Reason = "AccessToken not found" };

            if (tokenCheck.ExpiresAt < DateTime.UtcNow)
                return new TokenValidationResult { IsValid = false, Reason = "AccessToken expired" };

            if (tokenCheck.RevokedAt.HasValue)
                return new TokenValidationResult { IsValid = false, Reason = "AccessToken revoked" };

            return new TokenValidationResult { IsValid = true, Reason = "AccessToken valid" };
        }

        public async Task<TokenValidationResult> ValidateRefreshToken(string token)
        {
            var tokenCheck = await _context.RefreshTokens
                .FirstOrDefaultAsync(t => t.RefreshToken1 == token);

            if (tokenCheck == null)
                return new TokenValidationResult { IsValid = false, Reason = "RefreshToken not found" };

            if (tokenCheck.ExpiresAt < DateTime.UtcNow)
                return new TokenValidationResult { IsValid = false, Reason = "RefreshToken expired" };

            if (tokenCheck.RevokedAt.HasValue)
                return new TokenValidationResult { IsValid = false, Reason = "RefreshToken revoked" };

            return new TokenValidationResult { IsValid = true, Reason = "RefreshToken valid" };
        }

        public async Task<DecodeToken?> DecodeToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            if (!handler.CanReadToken(token))
                return null;

            var jwtToken = handler.ReadJwtToken(token);

            var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub);
            var emailClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email);
            var fullNameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "FullName");
            var roleIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "RoleId");

            if (userIdClaim == null || emailClaim == null || fullNameClaim == null || roleIdClaim == null)
                return null;

            //Console.WriteLine("Decoded Token - UserId: " + userIdClaim.Value);
            //Console.WriteLine("Decoded Token - Email: " + emailClaim.Value);
            //Console.WriteLine("Decoded Token - FullName: " + fullNameClaim.Value);
            //Console.WriteLine("Decoded Token - RoleId: " + roleIdClaim.Value);
            
            DecodeToken decodedToken = new DecodeToken
            {
                UserId = long.Parse(userIdClaim.Value),
                Email = emailClaim.Value,
                FullName = fullNameClaim.Value,
                RoleId = int.Parse(roleIdClaim.Value)
            };

            return decodedToken;
        }


        public string? GetLatestAccessTokenByUserId(long userId)
        {
            var latestToken = _context.AccessTokens
                .Where(t => t.UserId == userId && t.RevokedAt == null && t.ExpiresAt > DateTime.UtcNow)
                .OrderByDescending(t => t.CreatedAt)
                .FirstOrDefault();

            return latestToken?.AccessToken1;
        }

        public string? GetLatestRefreshTokenByUserId(long userId)
        {
            var latestToken = _context.RefreshTokens
                .Where(t => t.UserId == userId && t.RevokedAt == null && t.ExpiresAt > DateTime.UtcNow)
                .OrderByDescending(t => t.CreatedAt)
                .FirstOrDefault();
            return latestToken?.RefreshToken1;
        }
    }
}

