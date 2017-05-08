using System;
using HomeTasks.Models;

namespace HomeTasks.Data
{
    public class CategoriesRepository : RepositoryBase<CategoryModel>
    {
        public CategoriesRepository()
        {
            SeedData();
        }

        private void SeedData()
        {
            Entities = SeedGenerator.Seed().categories;
        }
    }
}
