using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
 public   class ItemsPaginingParametersDto
    {
        public int PageNumber { get; set; }
        public int ItemsOnPage { get; set; }
        public string SearchText { get; set; }
    }
}
