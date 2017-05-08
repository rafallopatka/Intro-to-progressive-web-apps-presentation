using System;
using System.Collections.Generic;
using HomeTasksPwa.Data;
using HomeTasksPwa.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeTasksPwa.Api
{
    [Produces("application/json")]
    [Route("api/Categories")]
    public class CategoriesController : Controller
    {
        private readonly CategoriesRepository _repository;

        public CategoriesController(CategoriesRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Categories
        [HttpGet]
        public IEnumerable<CategoryModel> Get()
        {
            return _repository.All();
        }

        // GET: api/Categories/5
        [HttpGet("{id}", Name = "GetCategory")]
        public CategoryModel Get(Guid id)
        {
            return _repository.Get(id);
        }
        
        // POST: api/Categories
        [HttpPost]
        public void Post([FromBody]CategoryModel value)
        {
            _repository.Add(value);
        }
        
        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody]CategoryModel value)
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
