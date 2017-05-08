using System;
using HomeTasksPwa.Models;

namespace HomeTasksPwa.Data
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
