using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
    public static class Utility
    {
        //makes expression for specific prop
        public static Expression<Func<TSource, object>> GetExpression<TSource>(string propertyName)
        {
            var param = Expression.Parameter(typeof(TSource), "x");
            Expression conversion = Expression.Convert(Expression.Property
            (param, propertyName), typeof(object));   //important to use the Expression.Convert
            return Expression.Lambda<Func<TSource, object>>(conversion, param);
        }
        public static Expression<Func<T, TKey>> OrderExpression<T, TKey>(string memberName)
        {
            ParameterExpression[] typeParams = new ParameterExpression[] { Expression.Parameter(typeof(T), "") };


            Expression<Func<T, TKey>> orderByExpression
                = (Expression<Func<T, TKey>>)Expression.Lambda(
                    Expression.Property(typeParams[0], memberName),
                    typeParams
                  );


            return orderByExpression;
        }
       
        public static IOrderedEnumerable<TSource>
        OrderBy<TSource>(this IEnumerable<TSource> source, string propertyName, string sortDirection)
        {
            if (!string.IsNullOrEmpty(sortDirection) && sortDirection.Equals("Descending"))
            {
                return source.OrderByDescending(OrderExpression<TSource, string>(propertyName).Compile());
            }
            else
            {
                return source.OrderBy(OrderExpression<TSource, string>(propertyName).Compile());
            }

        }

        
        public static IQueryable<T> OrderByField<T>(this IQueryable<T> q, string SortField, bool Ascending)
        {
            var param = Expression.Parameter(typeof(T), "p");
            var prop = Expression.Property(param, SortField);
            var exp = Expression.Lambda(prop, param);
            string method = Ascending ? "OrderBy" : "OrderByDescending";
            Type[] types = new Type[] { q.ElementType, exp.Body.Type };
            var mce = Expression.Call(typeof(Queryable), method, types, q.Expression, exp);
            return q.Provider.CreateQuery<T>(mce);
        }
    }
}
