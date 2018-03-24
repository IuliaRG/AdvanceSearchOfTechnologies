using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
    public static class Utility
    {
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> query, string propertyName, string sortDirection)
        {
            string fieldToSort;
             
        var userDetails = new string[] { "Address", "FirstName", "LastName" };
            if (userDetails.Contains(propertyName))
                fieldToSort = "UserDetails."+propertyName;
            else
                fieldToSort = propertyName;

            if (!string.IsNullOrEmpty(sortDirection) && sortDirection.Equals("Descending"))
            {
                return CallOrderedQueryable(query, "OrderByDescending", fieldToSort);
            }
            else
            {
                return CallOrderedQueryable(query, "OrderBy", fieldToSort);
            }
        }

        public static IOrderedQueryable<T> CallOrderedQueryable<T>(this IQueryable<T> query, string methodName, string propertyName)
        {
            var param = Expression.Parameter(typeof(T), "x");
            var body = propertyName.Split('.').Aggregate<string, Expression>(param, Expression.PropertyOrField);
            var result = (IOrderedQueryable<T>)query.Provider.CreateQuery(
                    Expression.Call(
                        typeof(Queryable),
                        methodName,
                        new[] { typeof(T), body.Type },
                        query.Expression,
                        Expression.Lambda(body, param)
                    )
                );

            return result;
        }
        public static IQueryable<T> Filter<T>(this IQueryable<T> Filterable, string PropertyName, object ParameterValue)
        {
            ConstantExpression c = Expression.Constant(ParameterValue);
            ParameterExpression p = Expression.Parameter(typeof(T), "xx");
            MemberExpression m = Expression.PropertyOrField(p, PropertyName);
            MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
            var containsMethodExp = Expression.Call(m, method, c);
            var Lambda = Expression.Lambda<Func<T, bool>>(containsMethodExp, p);
            Func<T, Boolean> func = Lambda.Compile();
            return Filterable.Where(func).AsQueryable();
        }
    }
}
