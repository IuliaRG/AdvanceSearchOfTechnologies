using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
  public  class StudentDetails
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Grades { get; set; }
        public virtual ICollection<TeacherDetails> Teachers { get; set; }
        public StudentDetails()
        {
            Teachers = new HashSet<TeacherDetails>();
        }
    }
}
