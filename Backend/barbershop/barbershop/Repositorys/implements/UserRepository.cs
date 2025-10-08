using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class UserRepository
    {
        private readonly BarbershopContext _context;
        public UserRepository()
        {
            _context = new BarbershopContext();
        }


        public async Task<User?> FindByPhone(string phone)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Phone == phone);
            return user;
        }

        public async Task<User?> AddUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.IsActive == true);
        }

        public async Task<User> GetUserByIdAsync(long userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId && u.IsActive == true);
        }

        public async Task<User?> FindByUsername(string? username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username && u.IsActive == true);
        }

        public async Task<User?> FindByUsernameAndPassword(string? username, string? password)
        {

            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username && u.Password == password && u.IsActive == true);
        }

        
        // TODO: Implement repository methods for User
    }
}
