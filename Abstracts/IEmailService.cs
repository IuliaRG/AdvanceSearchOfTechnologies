using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracts
{
    public interface IEmailService
    {
        void SendEmail(string email, string subject, string body);
        
    }
}
