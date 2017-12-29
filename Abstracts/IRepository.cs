using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Abstracts
{
    public interface IRepository<T>  where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(object Id);
        T GetByUserName(string UserName);
        void Insert(T obj);
        void Update(T obj);
        void Delete(object Id);
        void Save();



    }
}
