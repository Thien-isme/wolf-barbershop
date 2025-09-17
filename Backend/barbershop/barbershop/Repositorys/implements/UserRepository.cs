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
        // TODO: Implement repository methods for User
    }
}
