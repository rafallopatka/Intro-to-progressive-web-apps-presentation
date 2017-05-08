using System;
using HomeTasksPwaOptimized.Models;

namespace HomeTasksPwaOptimized.Data
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
