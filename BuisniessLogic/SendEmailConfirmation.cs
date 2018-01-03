using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
   public  class SendEmailConfirmation : EmailService
    {
        private string email ;
        private string linkForConfirmation;
        private string cxc;
        public override string TextSubject { get { return "Confirm email";  } }
        public override string TextBody { get { return "Press link to confirm your email "; } }
        public override string EmailTo { get { return email; } }
        public override string Link { get { return linkForConfirmation; } }
        public SendEmailConfirmation(string link, string emailAddress) : base()
        {
            linkForConfirmation = link;
            email = emailAddress;
        }
       

    }
}
