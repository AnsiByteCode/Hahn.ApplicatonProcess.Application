namespace Hahn.ApplicatonProcess.May2020.Domain.Services
{
    using Hahn.ApplicatonProcess.May2020.Data.DataContext;
    using Hahn.ApplicatonProcess.May2020.Data.DbSets.Models;
    using Hahn.ApplicatonProcess.May2020.Domain.Interfaces;
    using System.Collections.Generic;
    using System.Linq;
    public class ApplicantService : IApplicantService
    {
        private readonly HahnDBContext _dbContext;

        public ApplicantService(HahnDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Applicant> GetApplicants()
        {
            return _dbContext.Applicants.ToList();
        }

        public Applicant GetApplicantById(int id)
        {
            Applicant applicant = _dbContext.Applicants.Find(id);
            return applicant;
        }

        public int SaveApplicantDetails(Applicant applicant)
        {
            _dbContext.Applicants.Add(applicant);
            _dbContext.SaveChanges();
            return applicant.Id;
        }

        public void UpdateApplicantDetails(Applicant applicant)
        {
            _dbContext.Applicants.Update(applicant);
            _dbContext.SaveChanges();
        }

        public void DeleteApplicantDetails(Applicant applicant)
        {
            _dbContext.Applicants.Remove(applicant);
            _dbContext.SaveChanges();
        }
    }
}
