using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
   public  class TeacherDetails
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Discipline { get; set; }
        public  virtual ICollection<StudentDetails> Students { get; set; }
        public TeacherDetails()
        {
            Students = new HashSet<StudentDetails>();
        }
    }
}
