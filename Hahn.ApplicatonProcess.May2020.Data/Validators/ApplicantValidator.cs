using System.Net.Http;
using FluentValidation;
using FluentValidation.Validators;
using Hahn.ApplicatonProcess.May2020.Data.DbSets.Models;
using Microsoft.Extensions.Configuration;

namespace Hahn.ApplicatonProcess.May2020.Data.Validators
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="FluentValidation.AbstractValidator{Hahn.ApplicatonProcess.May2020.Data.DbSets.Models.Applicant}" />
    public class ApplicantValidator : AbstractValidator<Applicant>
    {
        /// <summary>
        /// The configuration
        /// </summary>
        private readonly IConfiguration configuration;
        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicantValidator"/> class.
        /// </summary>
        /// <param name="Configuration">The configuration.</param>
        public ApplicantValidator(IConfiguration Configuration)
        {
            configuration = Configuration;
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required field").MinimumLength(5).WithMessage("Name must be at least 5 character");
            RuleFor(x => x.FamilyName).NotEmpty().WithMessage("Family Name is required field").MinimumLength(5).WithMessage("Family Name must be at least 5 character");
            RuleFor(x => x.Address).NotEmpty().WithMessage("Address is required field").MinimumLength(10).WithMessage("Address must be at least 10 character");
            RuleFor(x => x.EmailAddress).NotEmpty().WithMessage("Email Address is required field").EmailAddress(EmailValidationMode.AspNetCoreCompatible).WithMessage("Email Address is not a valid email");
            RuleFor(x => x.Age).NotEmpty().WithMessage("Age is required field").InclusiveBetween(20, 60).WithMessage("Age must be between 20 and 60");
            RuleFor(x => x.CountryOfOrigin).NotEmpty().WithMessage("Country of origin is required field").Must(BeAValidCountryofOrigin).WithMessage("Please specify a valid country");
            RuleFor(x => x.Hired).NotNull();
        }

        /// <summary>
        /// To Check valid country of origin.
        /// </summary>
        /// <param name="countryName">Name of the country.</param>
        /// <returns></returns>
        private bool BeAValidCountryofOrigin(string countryName)
        {
            var urltoValidateCountry = configuration.GetSection("Validations").GetValue<string>("CountryValidationUrl");
            if (!string.IsNullOrEmpty(urltoValidateCountry))
            {
                using (var client = new HttpClient())
                {
                    var webResponse = client.GetAsync(string.Format(urltoValidateCountry,countryName));
                    if (webResponse.Result.IsSuccessStatusCode)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
