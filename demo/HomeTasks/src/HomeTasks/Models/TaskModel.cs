using System;

namespace HomeTasks.Models
{
    public class TaskModel : ModelBase
    {
        public string Description { get; set; }

        public CategoryModel Category { get; set; }

        public UserModel ResponsibleUser { get; set; }

        public bool IsDone { get; set; }

        public DateTime LastModification { get; set; }
    }
}
