using BusinessObjects.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
   public class TextAnalyticResponsDto
    {
        public List<TextAnalyticsSentimentDto> Documents { get; set; }
        public List<object> errors { get; set; }
    }
}
