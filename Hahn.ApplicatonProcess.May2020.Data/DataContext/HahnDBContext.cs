using Hahn.ApplicatonProcess.May2020.Data.DbSets.Models;
using Microsoft.EntityFrameworkCore;

namespace Hahn.ApplicatonProcess.May2020.Data.DataContext
{
    /// <summary>
    /// In memory DBContext
    /// </summary>
    /// <seealso cref="Microsoft.EntityFrameworkCore.DbContext" />
    public class HahnDBContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="HahnDBContext"/> class.
        /// </summary>
        /// <param name="options">The options.</param>
        public HahnDBContext(DbContextOptions<HahnDBContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// Gets or sets the applicants.
        /// </summary>
        /// <value>
        /// The applicants.
        /// </value>
        public DbSet<Applicant> Applicants { get; set; }
    }
}
