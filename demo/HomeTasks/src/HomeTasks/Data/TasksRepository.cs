using HomeTasks.Models;

namespace HomeTasks.Data
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
