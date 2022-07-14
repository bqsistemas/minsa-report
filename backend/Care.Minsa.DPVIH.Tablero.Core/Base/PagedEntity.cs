using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Base
{
    public static class PagedEntity
    {
        public static PagedResult<T> GetPaged<T>(this IQueryable<T> query,
                                         PagedFilter filter) where T : class
        {
            var result = new PagedResult<T>();
            result.CurrentPage = filter.Page;
            result.PageSize = filter.PageSize;
            result.RowCount = query.Count();


            result.PageCount = (int)Math.Ceiling((double)result.RowCount / filter.PageSize);

            var skip = (filter.Page - 1) * filter.PageSize;
            result.Results = query.Skip(skip).Take(filter.PageSize).ToList();

            return result;
        }
    }
}
