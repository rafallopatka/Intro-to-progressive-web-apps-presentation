using HomeTasksPwa.Models;

namespace HomeTasksPwa.Data
{
    public class TasksRepository : RepositoryBase<TaskModel>
    {
        public TasksRepository()
        {
            SeedData();
        }

        private void SeedData()
        {
            Entities = SeedGenerator.Seed().tasks;
        }
    }
}
