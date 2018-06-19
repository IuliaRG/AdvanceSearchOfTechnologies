﻿using BusinessObjects;
using BusinessObjects.Entity;
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
        public DbSet<ProductDetails> Product { get; set; }
        public DbSet<UserReview> Review { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
          //  modelBuilder.Entity<ApplicationUser>()
          //.HasMany(c => c.UserReview);

            modelBuilder.Entity<ApplicationUser>()
            .HasMany(g => g.UserReview)
            .WithRequired(s => s.ApplicationUser)
            .HasForeignKey<string>(s => s.ApplicationUserId);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductDetails>()
          .HasMany(g => g.UserReview)
          .WithRequired(s => s.ProductDetails)
          .HasForeignKey<int>(s => s.ProductDetails_Id);
            base.OnModelCreating(modelBuilder);


        }
     
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}
