using Abstracts;
using BusinessObjects.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
           AutomaticMigrationsEnabled = true;
          AutomaticMigrationDataLossAllowed = true;
           
            ContextKey = "DAL.ApplicationDbContext";
        }
        protected override void Seed(ApplicationDbContext context)
        {
            if (!(context.Roles.Any(it => it.Name == UserRole.Admin.ToString())))
            {
                context.Roles.AddOrUpdate(new ApplicationRole() { Name = UserRole.Admin.ToString()});
            }
            if (!(context.Roles.Any(it => it.Name == UserRole.NormalUser.ToString())))
            {
                context.Roles.AddOrUpdate(new ApplicationRole() { Name = UserRole.NormalUser.ToString()  });
            }
          if (!(context.Roles.Any(it => it.Name == UserRole.UserTest2.ToString())))
            {
                context.Roles.AddOrUpdate(new ApplicationRole() { Name = UserRole.UserTest2.ToString() });
            }
            context.SaveChanges();
            base.Seed(context);
        }
    }
}
