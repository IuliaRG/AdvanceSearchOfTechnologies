using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
  public  class ProductDetails
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string Image { get; set; }
        public string ShortDescription { get; set; }
        public string Brand { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Model { get; set; }
        public string Dimensions { get; set; }
        public virtual ICollection<UserReview> UserReview { get; set; }
    }
}
