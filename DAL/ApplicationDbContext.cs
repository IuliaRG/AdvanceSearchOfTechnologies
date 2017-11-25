using BusinessObjects;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
namespace DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("ApplicationDbContext", throwIfV1Schema: false)
        {
            this.Configuration.LazyLoadingEnabled = true;
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, DAL.Configuration>("ApplicationDbContext"));

        }
        public DbSet<UserDetails> User { get; set; }
        public DbSet<StudentDetails> Student { get; set; }
        public DbSet<TeacherDetails> Teacher { get; set; }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
           

            modelBuilder.Entity<TeacherDetails>()
                        .HasMany(s => s.Students)
                        .WithMany(c => c.Teachers)
                        .Map(cs =>
                        {
                            cs.MapLeftKey("TeachersID");
                            cs.MapRightKey("StudentID");
                            cs.ToTable("TeachersStudents");
                        });

            base.OnModelCreating(modelBuilder);

        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}
