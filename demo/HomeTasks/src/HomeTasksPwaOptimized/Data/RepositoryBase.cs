using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using HomeTasksPwaOptimized.Models;

namespace HomeTasksPwaOptimized.Data
{
    public abstract class RepositoryBase<TEntity> where TEntity : ModelBase
    {
        protected IDictionary<Guid, TEntity> Entities;

        protected RepositoryBase()
        {
            Entities = new Dictionary<Guid, TEntity>();
        }

        public virtual IReadOnlyCollection<TEntity> All()
        {
            return new ReadOnlyCollection<TEntity>(Entities.Values.ToList());
        }

        public virtual IReadOnlyCollection<TEntity> Query(Func<TEntity, bool> expression)
        {
            return new ReadOnlyCollection<TEntity>(Entities.Values.Where(expression).ToList());
        }

        public virtual TEntity Get(Guid id)
        {
            return Entities[id];
        }

        public virtual TEntity Add(TEntity entity)
        {
            entity.Id = Guid.NewGuid();
            Entities.Add(entity.Id, entity);
            return entity;
        }

        public virtual TEntity Update(TEntity entity)
        {
            Entities[entity.Id] = entity;
            return entity;
        }

        public virtual void Delete(TEntity entity)
        {
            Entities.Remove(entity.Id);
        }

        public virtual void Delete(Guid id)
        {
            Entities.Remove(id);
        }
    }
}
