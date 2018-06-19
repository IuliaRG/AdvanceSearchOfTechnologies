using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Dto
{
  public  class MeniuModelDto
    {
        public string Category { get; set; }
        public IEnumerable<string> Brands { get; set; }
      
    }
}
