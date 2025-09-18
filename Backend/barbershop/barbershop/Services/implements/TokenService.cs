using barbershop.Helpers;
using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        public string GenerateAccessToken(User user, string secretKey, string issuer, string audience, int expireDays = 1)
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
                expires: DateTime.Now.AddDays(expireDays),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken(User user, string secretKey, string issuer, string audience, int expireDays = 7)
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
                expires: DateTime.Now.AddDays(expireDays),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        public async Task<(string AccessToken, string RefreshToken)> GenerateTokens(User user, string secretKey, string issuer, string audience, int expireDays = 7)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim("FullName", user.FullName ?? ""),
                new Claim("roleId", user.RoleId.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Access Token
            var accessTokenJwt = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddDays(expireDays),
                signingCredentials: creds);

            var accessToken = new JwtSecurityTokenHandler().WriteToken(accessTokenJwt);

            // Refresh Token
            var refreshClaims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim("FullName", user.FullName ?? ""),
                new Claim("roleId", user.RoleId.ToString())
            };

            var refreshTokenJwt = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: refreshClaims,
                expires: DateTime.Now.AddDays(expireDays+6),
                signingCredentials: creds);

            var refreshToken = new JwtSecurityTokenHandler().WriteToken(refreshTokenJwt);

            // Lưu access token vào DB
            var accessTokenEntity = new AccessToken
            {
                UserId = user.UserId,
                AccessToken1 = accessToken,
                ExpiresAt = accessTokenJwt.ValidTo,
                CreatedAt = DateTime.Now,
                RevokedAt = null
            };

            var refreshTokenEntity = new RefreshToken
            {
                UserId = user.UserId,
                RefreshToken1 = refreshToken,
                ExpiresAt = refreshTokenJwt.ValidTo,
                CreatedAt = DateTime.Now,
                RevokedAt = null
            };

            _context.RefreshTokens.Add(refreshTokenEntity);
            _context.AccessTokens.Add(accessTokenEntity);
            await _context.SaveChangesAsync();

            return (accessToken, refreshToken);
        }

        public async Task<bool> ValidateAccessToken(string accessToken)
        {
            var token = await _context.AccessTokens
                .FirstOrDefaultAsync(t => t.AccessToken1 == accessToken);
            if (token == null)
                return false;

            if (token.ExpiresAt < DateTime.UtcNow)
                return false;

            if (token.RevokedAt.HasValue)
                return false;

            return true;
        }
    }
}

