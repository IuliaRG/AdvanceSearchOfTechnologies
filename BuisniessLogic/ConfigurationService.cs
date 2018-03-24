using Abstracts;
using BusinessObjects.Dto;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
    public class ConfigurationService : IConfigurationService
    {
        public Configuration GetConfiguration()
        {
            Configuration configuration = new Configuration();
            configuration.EmailConfiguration = GetEmailConfiguration();
            configuration.TextAnalyticsConfiguration = GetKeyConfiguration();
            return configuration;
        }

        private EmailConfiguration GetEmailConfiguration()
        {
            string filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/EmailConfiguration.json");
            using (StreamReader r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();
                EmailConfiguration result = JsonConvert.DeserializeObject < EmailConfiguration>(json);
                return result;
            }
        }
        private TextAnalyticsConfiguration GetKeyConfiguration()
        {
            string filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/TextAnalyticsConfiguration.json");
            using (StreamReader r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();
                TextAnalyticsConfiguration result = JsonConvert.DeserializeObject<TextAnalyticsConfiguration>(json);
                return result;
            }
        }
    }
}
