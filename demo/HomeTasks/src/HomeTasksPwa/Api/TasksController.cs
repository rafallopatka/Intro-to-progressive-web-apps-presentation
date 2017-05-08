using System;
using System.Collections.Generic;
using System.Linq;
using HomeTasksPwa.Data;
using HomeTasksPwa.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeTasksPwa.Api
{
    [Produces("application/json")]
    [Route("api/Tasks")]
    public class TasksController : Controller
    {
        private readonly TasksRepository _repository;

        public TasksController(TasksRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Tasks
        [HttpGet]
        public IEnumerable<TaskModel> Get()
        {
            return _repository.All();
        }

        // GET: api/Tasks/ToDo
        [HttpGet("ToDo/", Name = nameof(GetToDoTasks))]
        public IEnumerable<TaskModel> GetToDoTasks()
        {
            return _repository
                .Query(x => x.IsDone == false || x.LastModification.Date == DateTime.Now.Date)
                .OrderBy(x => x.IsDone);
        }

        // GET: api/Tasks/Done
        [HttpGet("Done/", Name = nameof(GetDoneTasks))]
        public IEnumerable<TaskModel> GetDoneTasks()
        {
            return _repository
                .Query(x => x.IsDone || x.LastModification.Date < DateTime.Now.Date)
                .OrderByDescending(x => x.LastModification);
        }

        // GET: api/Tasks/5
        [HttpGet("{id}", Name = "GetTask")]
        public TaskModel Get(Guid id)
        {
            return _repository.Get(id);
        }

        // POST: api/Tasks
        [HttpPost]
        public TaskModel Post([FromBody]TaskModel value)
        {
            return _repository.Add(value);
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public TaskModel Put(Guid id, [FromBody]TaskModel value)
        {
            return _repository.Update(value);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _repository.Delete(id);
        }
    }
}
