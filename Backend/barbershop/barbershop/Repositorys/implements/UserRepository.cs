using barbershop.Models.Entitys;

namespace barbershop.Repositorys.implements
{
    public class UserRepository
    {
        private readonly BarbershopContext _context;
        public UserRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<User?> AddUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        // TODO: Implement repository methods for User
    }
}
