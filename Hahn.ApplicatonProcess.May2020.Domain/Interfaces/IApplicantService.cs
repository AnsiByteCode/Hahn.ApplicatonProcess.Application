namespace Hahn.ApplicatonProcess.May2020.Domain.Interfaces
{
    using Hahn.ApplicatonProcess.May2020.Data.DbSets.Models;
    using System.Collections.Generic;
    /// <summary>
    /// Applicant Service
    /// </summary>
    public interface IApplicantService
    {
        /// <summary>
        /// Gets the applicants.
        /// </summary>
        /// <returns></returns>
        List<Applicant> GetApplicants();
        /// <summary>
        /// Gets the applicant by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        Applicant GetApplicantById(int id);
        /// <summary>
        /// Saves the applicant details.
        /// </summary>
        /// <param name="applicant">The applicant.</param>
        /// <returns></returns>
        int SaveApplicantDetails(Applicant applicant);
        /// <summary>
        /// Updates the applicant details.
        /// </summary>
        /// <param name="applicant">The applicant.</param>
        void UpdateApplicantDetails(Applicant applicant);
        /// <summary>
        /// Deletes the applicant details.
        /// </summary>
        /// <param name="applicant">The applicant.</param>
        void DeleteApplicantDetails(Applicant applicant);
    }
}
