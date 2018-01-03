using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
   public  class EmailConfirmation : EmailService
    {
        private string email ;
        private string linkForConfirmation;
        public override string TextSubject { get { return "Confirm email";  } }
        public override string TextBody { get { return "Press link to confirm your email "; } }
        public override string EmailTo { get { return email; } }
        public override string Link { get { return linkForConfirmation; } }
        public EmailConfirmation() : base()
        { }
        public override void SendEmailConfirmation(string link, string emailAddress)
        {
            linkForConfirmation = link;
             email = emailAddress;
        }

    }
}
