using System;
using System.Collections.Generic;
using System.Linq;
using HomeTasks.Models;

namespace HomeTasks.Data
{
    public static class SeedGenerator
    {
        private static (Dictionary<Guid, CategoryModel> categories, IDictionary<Guid, UserModel> users, Dictionary<Guid, TaskModel> tasks)? _seedData;

        private static IList<UserModel> GenerateUsers()
        {
            return new List<UserModel>
            {
                new UserModel
                {
                    Id = Guid.Empty,
                    Name = "Raf"
                },

                new UserModel
                {
                    Id = Guid.NewGuid(),
                    Name = "Ewa"
                }
            };
        }

        private static IList<CategoryModel> GenerateCategories()
        {
            return new List<CategoryModel>
            {
                new CategoryModel
                {
                    Id = Guid.NewGuid(),
                    DisplayName = "Zakupy",
                    UniqueName = "shopping"
                },

                new CategoryModel
                {
                    Id = Guid.NewGuid(),
                    DisplayName = "Dom",
                    UniqueName = "home"
                },

                new CategoryModel
                {
                    Id = Guid.NewGuid(),
                    DisplayName = "Porządki",
                    UniqueName = "cleaning"
                },

                new CategoryModel
                {
                    Id = Guid.NewGuid(),
                    DisplayName = "Rodzina",
                    UniqueName = "family"
                },

                new CategoryModel
                {
                    Id = Guid.NewGuid(),
                    DisplayName = "Lekarz",
                    UniqueName = "medic"
                }
            };
        }

        private static IList<TaskModel> GenerateTasks(
            bool isDone, 
            DateTime dateTime,
            IEnumerable<CategoryModel> categories, 
            IEnumerable<UserModel> users)
        {
            return new List<TaskModel>
            {
                new TaskModel
                {
                    Id = Guid.NewGuid(),
                    Category = categories.ElementAt(0),
                    ResponsibleUser = users.ElementAt(0),
                    Description = "Zrobić zakupy na jutro",
                    IsDone = isDone,
                    LastModification = dateTime
                },
                new TaskModel
                {
                    Id = Guid.NewGuid(),
                    Category = categories.ElementAt(0),
                    ResponsibleUser = users.ElementAt(0),
                    Description = "Kupić buty",
                    IsDone = isDone,
                    LastModification = dateTime
                },
                new TaskModel
                {
                    Id = Guid.NewGuid(),
                    Category = categories.ElementAt(1),
                    ResponsibleUser = users.ElementAt(0),
                    Description = "Wymienić gniazdko w pokoju",
                    IsDone = isDone,
                    LastModification = dateTime
                },
                new TaskModel
                {
                    Id = Guid.NewGuid(),
                    Category = categories.ElementAt(2),
                    ResponsibleUser = users.ElementAt(0),
                    Description = "Posprzątać warsztat",
                    IsDone = isDone,
                    LastModification = dateTime
                },
                new TaskModel
                {
                    Id = Guid.NewGuid(),
                    Category = categories.ElementAt(2),
                    ResponsibleUser = users.ElementAt(1),
                    Description = "Umyć okna",
                    IsDone = isDone,
                    LastModification = dateTime
                },
                new TaskModel
                {
                    Id = Guid.NewGuid(),
                    Category = categories.ElementAt(3),
                    ResponsibleUser = users.ElementAt(1),
                    Description = "Odebrać dzieci z przedszkola",
                    IsDone = isDone,
                    LastModification = dateTime
                },
                new TaskModel
                {
                    Id = Guid.NewGuid(),
                    Category = categories.ElementAt(3),
                    ResponsibleUser = users.ElementAt(0),
                    Description = "Zawieźć dzieci do przedszkola",
                    IsDone = isDone,
                    LastModification = dateTime
                },
                new TaskModel
                {
                    Id = Guid.NewGuid(),
                    Category = categories.ElementAt(4),
                    ResponsibleUser = users.ElementAt(1),
                    Description = "Umówić się na badania",
                    IsDone = isDone,
                    LastModification = dateTime
                }
            };
        }

        public static (Dictionary<Guid, CategoryModel> categories, IDictionary<Guid, UserModel> users, Dictionary<Guid, TaskModel> tasks) Seed()
        {
            if (_seedData != null)
                return _seedData.Value;

            var categories = GenerateCategories().ToDictionary(x => x.Id);
            var users = GenerateUsers().ToDictionary(x => x.Id);

            var todoTasks = GenerateTasks(false, DateTime.Now, categories.Values, users.Values);
            var pastTasks1 = GenerateTasks(true, DateTime.Now.AddDays(-1), categories.Values, users.Values);
            var pastTasks2 = GenerateTasks(true, DateTime.Now.AddDays(-2), categories.Values, users.Values);
            var pastTasks3 = GenerateTasks(true, DateTime.Now.AddDays(-3), categories.Values, users.Values);

            var allTasks = new List<TaskModel>();
            allTasks.AddRange(todoTasks);
            allTasks.AddRange(pastTasks1);
            allTasks.AddRange(pastTasks2);
            allTasks.AddRange(pastTasks3);

            var tasks = allTasks.ToDictionary(x => x.Id);
            _seedData = (categories, users, tasks);

            return _seedData.Value;
        }
    }
}
