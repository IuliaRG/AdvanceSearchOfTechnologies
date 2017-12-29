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
    public class EmailService 
    {
        public void SendEmail(string link)
        {
            
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("ProiectIulia@sendgrid.com");
             mail.To.Add("rad.iulia19@gmail.com");
           
            mail.CC.Add("andonis.gaja@gmail.com");
            mail.Subject = "test email";
            mail.IsBodyHtml = true;
           
            mail.Body = "My first email " + link;

            // Init SmtpClient and send
            SmtpClient smtpClient = new SmtpClient("smtp.sendgrid.net", Convert.ToInt32(587));
           
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("fKg9p53xSKevfplc4EKe6g", "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");
            smtpClient.Credentials = credentials;
            smtpClient.Send(mail);

        }

       
    }
}
