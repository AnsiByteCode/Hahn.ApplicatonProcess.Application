using System;
using System.Linq;
using Hahn.ApplicatonProcess.May2020.Data.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Hahn.ApplicatonProcess.May2020.Data.DataGenerator
{
    /// <summary>
    /// Seeder for initial data 
    /// </summary>
    public class InitDataGenerator
    {
        /// <summary>
        /// Initializes the specified service provider.
        /// </summary>
        /// <param name="serviceProvider">The service provider.</param>
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new HahnDBContext(serviceProvider.GetRequiredService<DbContextOptions<HahnDBContext>>()))
            {
                // Look for any board games already in database.
                if (context.Applicants.Any())
                {
                    return;   // Database has been seeded
                }

                context.Applicants.AddRange(
                    new DbSets.Models.Applicant
                    {
                        Id = 1,
                        Name = "Mark Johnson",
                        FamilyName = "Mark",
                        Address = "Novato California",
                        Age = 30,
                        CountryOfOrigin = "United States of America",
                        EmailAddress = "mark.johnson@gmail.com",
                        Hired = false
                    },
                    new DbSets.Models.Applicant
                    {
                        Id = 2,
                        Name = "Steve Morris",
                        FamilyName = "Steve",
                        Address = "Chicago",
                        Age = 32,
                        CountryOfOrigin = "United States of America",
                        EmailAddress = "steve.m@gmail.com",
                        Hired = true
                    },
                    new DbSets.Models.Applicant
                    {
                        Id = 3,
                        Name = "Alestair Cook",
                        FamilyName = "Ales",
                        Address = "Wellington",
                        Age = 28,
                        CountryOfOrigin = "New Zealand",
                        EmailAddress = "a.cook@yahoo.com",
                        Hired = false
                    },
                    new DbSets.Models.Applicant
                    {
                        Id = 4,
                        Name = "Kevin Peterson",
                        FamilyName = "Kevin",
                        Address = "London",
                        Age = 30,
                        CountryOfOrigin = "England",
                        EmailAddress = "kevinp@gmail.com",
                        Hired = true
                    });

                context.SaveChanges();
            }
        }
    }
}