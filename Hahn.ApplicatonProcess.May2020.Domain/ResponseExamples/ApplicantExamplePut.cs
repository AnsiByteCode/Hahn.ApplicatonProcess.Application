using Hahn.ApplicatonProcess.May2020.Data.DbSets.Models;
using Swashbuckle.AspNetCore.Filters;

namespace Hahn.ApplicatonProcess.May2020.Domain.ResponseExamples
{
    /// <summary>
    /// Applicant Example
    /// </summary>
    /// <seealso cref="Swashbuckle.AspNetCore.Filters.IExamplesProvider{Hahn.ApplicatonProcess.May2020.Data.DbSets.Models.Applicant}" />
    public class ApplicantExamplePut : IExamplesProvider<Applicant>
    {
        /// <summary>
        /// Gets the examples.
        /// </summary>
        /// <returns></returns>
        public Applicant GetExamples()
        {
            return new Applicant()
            {
                Id = 99,
                Name = "Applicant Name",
                FamilyName = "Family or nick Name",
                Address = "Applicant's Address",
                Age = 25,
                CountryOfOrigin = "India",
                EmailAddress = "valid@email.com",
                Hired = true
            };
        }
    }
}
