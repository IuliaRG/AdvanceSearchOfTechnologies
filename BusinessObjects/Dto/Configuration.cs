using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Dto
{
    public class Configuration
    {
        public EmailConfiguration EmailConfiguration { get; set; }
        public TextAnalyticsConfiguration TextAnalyticsConfiguration { get; set; }
    }
}
