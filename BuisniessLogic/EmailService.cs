using Abstracts;
using BusinessObjects.Dto;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
    public class EmailService : IEmailService
    {
        public virtual string Text { get; set; }
        public virtual string TextSubject { get; set; }
        public virtual string TextBody { get; set; }
        public virtual string EmailTo { get; set; }
        public virtual string Link { get; set; }
        IConfigurationService configurationService;
      public  EmailService(IConfigurationService configurationService)
        {
            this.configurationService = configurationService;
        }
        public void SendEmail(string email,string subject,string body)
        {
            var emailConfiguration = configurationService.GetConfiguration().EmailConfiguration;
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("iulia.rad19@gmail.com");
             mail.To.Add("rad.iulia19@gmail.com");
            // mail.To.Add(emailAddress);
            mail.Subject = subject;
            mail.IsBodyHtml = true;
            mail.Body = body;
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", Convert.ToInt32(587));
            smtpClient.EnableSsl = true;
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(emailConfiguration.UserName, emailConfiguration.Password);
            smtpClient.Credentials = credentials;
            smtpClient.Send(mail);
           
        }
    }
}
