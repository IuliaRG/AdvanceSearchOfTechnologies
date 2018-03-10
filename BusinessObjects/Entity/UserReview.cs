using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class UserReview
    {
        [Key]
        public int ReviewId { get; set; }
        public string Content { get; set; }
        public string ApplicationUserId { get; set; }
       public ApplicationUser ApplicationUser { get; set; }

    }
}
