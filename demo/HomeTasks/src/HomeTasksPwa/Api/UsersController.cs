using System;
using System.Collections.Generic;
using HomeTasksPwa.Data;
using HomeTasksPwa.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeTasksPwa.Api
{
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly UsersRepository _repository;

        public UsersController(UsersRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<UserModel> Get()
        {
            return _repository.All();
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "GetUser")]
        public UserModel Get(Guid id)
        {
            return _repository.Get(id);
        }
        
        // POST: api/Users
        [HttpPost]
        public void Post([FromBody]UserModel value)
        {
            _repository.Add(value);
        }
        
        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody]UserModel value)
        {
            _repository.Update(value);
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _repository.Delete(id);
        }
    }
}
