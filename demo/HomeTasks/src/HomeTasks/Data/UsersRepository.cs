using HomeTasks.Models;

namespace HomeTasks.Data
{
    public class UsersRepository : RepositoryBase<UserModel>
    {
        public UsersRepository()
        {
            SeedData();
        }

        private void SeedData()
        {
            Entities = SeedGenerator.Seed().users;
        }
    }
}
