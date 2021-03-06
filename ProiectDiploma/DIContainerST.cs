﻿using Abstracts;
using BuisniessLogic;
using BusinessObjects;
using BusinessObjects.Entity;
using DAL;
using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProiectDiploma
{
    public class DIContainerST
    {
        private  IUnityContainer unityContainer;
        private static DIContainerST instance;
        private DIContainerST()
        {
            unityContainer = new UnityContainer();
            unityContainer.RegisterType<IUserService, UserService>();
            unityContainer.RegisterType<IUserRoleService, UserRoleService>();
            unityContainer.RegisterType<IReviewService, ReviewService>();
            unityContainer.RegisterType<IProductService, ProductService>();
            unityContainer.RegisterType<IEmailService, EmailService>();
            unityContainer.RegisterType<IRepository<UserDetails>, Repository<UserDetails>>();
            unityContainer.RegisterType<IRepository<UserReview>, Repository<UserReview>>();
            unityContainer.RegisterType<IRepository<ProductDetails>, Repository<ProductDetails>>();
            unityContainer.RegisterType<IRepository<ApplicationUser>, Repository<ApplicationUser>>();
            unityContainer.RegisterType<IRepository<ApplicationRole>, Repository<ApplicationRole>>();
            unityContainer.RegisterType < IConfigurationService, ConfigurationService>();
        }
        public static DIContainerST GetInstance()
        {
                if (instance == null)
                {
                    instance = new DIContainerST();
                }
                return instance;
        }

        public T Resolve<T>() {
            var result = unityContainer.Resolve<T>();
            return result;
        }
    }
}