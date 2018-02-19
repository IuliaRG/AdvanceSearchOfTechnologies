using Abstracts;
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
        public void SendEmail(string email,string subject,string body)
        {
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("ProiectIulia@sendgrid.com");
             mail.To.Add("rad.iulia19@gmail.com");
            // mail.To.Add(emailAddress);
            mail.Subject = subject;
            mail.IsBodyHtml = true;
            mail.Body = body;
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", Convert.ToInt32(587));
            smtpClient.EnableSsl = true;
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("fKg9p53xSKevfplc4EKe6g", "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");
            smtpClient.Credentials = credentials;
            smtpClient.Send(mail);
        }
    }
}
