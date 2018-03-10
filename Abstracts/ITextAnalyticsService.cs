using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracts
{
    public interface ITextAnalyticsService
    {
        IEnumerable<string> GetKeyPhrases(string text);

      //  ResponseLanguage GetLanguage(string languageText);

      //  ResponseSentiment GetSentiment(string sentimentText);

      string SerializeText(string text);
        

    }
}
