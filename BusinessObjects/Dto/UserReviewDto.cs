using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
  public class UserReviewDto
    {
        public int? ReviewId { get; set; }
        public string Content { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUserDto ApplicationUserDto { get; set; }

    }
}
