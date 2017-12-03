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
           
            if (!(context.Roles.Any(it => it.Name == DataToCheck.UserRole.Admin.ToString())))
            {
                context.Roles.AddOrUpdate(new ApplicationRole() { Name = DataToCheck.UserRole.Admin.ToString() });
            }
            if (!(context.Roles.Any(it => it.Name == DataToCheck.UserRole.NormalUser.ToString())))
            {
                context.Roles.AddOrUpdate(new ApplicationRole() { Name = DataToCheck.UserRole.NormalUser.ToString()  });
            }
          if (!(context.Roles.Any(it => it.Name == DataToCheck.UserRole.UserTest2.ToString())))
            {
                context.Roles.AddOrUpdate(new ApplicationRole() { Name = DataToCheck.UserRole.UserTest2.ToString() });
            }
     
            context.SaveChanges();
            base.Seed(context);
        }
    }
}
