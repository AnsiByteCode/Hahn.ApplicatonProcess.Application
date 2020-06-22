namespace Hahn.ApplicatonProcess.May2020.Web.ApiControllers {
	using System.Collections.Generic;
	using Hahn.ApplicatonProcess.May2020.Data.DbSets.Models;
	using Hahn.ApplicatonProcess.May2020.Domain.Interfaces;
	using Hahn.ApplicatonProcess.May2020.Domain.ResponseExamples;
	using Microsoft.AspNetCore.Http;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.Extensions.Logging;
	using Swashbuckle.AspNetCore.Filters;

	/// <summary>
	/// </summary>
	public class ApplicantController : BaseController {
		//private readonly HahnDBContext _dbContext;
		private readonly IApplicantService _applicantService;
		private readonly ILogger<ApplicantController> _log;
		private string message = string.Empty;

		public ApplicantController(IApplicantService applicantService, ILogger<ApplicantController> log) {
			_applicantService = applicantService;
			_log = log;
		}

		// GET: api/<ApplicantController>
		[HttpGet]
		[Route("GetAll")]
		public ActionResult<List<Applicant>> Get() {
			message = "Applicant:Get";
			try {
				_log.LogInformation($"Accessing {message} API");
				_log.LogInformation($"Applicants Data fetch successfully.");
				return _applicantService.GetApplicants();
			}
			catch (System.Exception ex) {
				_log.LogError(ex, $"{message}: There was an error while accessing API");
				return BadRequest();
			}
		}

		// GET api/<ApplicantController>/5
		[HttpGet("{id}")]
		public ActionResult<Applicant> Get(int id) {
			message = "Applicant:GetById";
			try {
				_log.LogInformation($"Accessing {message} API");
				var applicant = _applicantService.GetApplicantById(id);
				if (applicant == null) {
					_log.LogInformation($"{message}: Applicant details with Id: {id} not found.");
					return NotFound();
				}
				_log.LogInformation($"{message}: Applicant {applicant.Name} data fetch successfully.");
				return applicant;
			}
			catch (System.Exception ex) {
				_log.LogError(ex, $"{message}: There was an error while accessing API");
				return BadRequest();
			}
		}

		// POST api/<ApplicantController>
		[HttpPost]
		[ProducesResponseType(StatusCodes.Status201Created)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[SwaggerRequestExample(typeof(Applicant), typeof(ApplicantExamplePost))]
		public ActionResult<Applicant> Post(Applicant applicant) {
			message = "Applicant:Post";
			try {
				_log.LogInformation($"Accessing {message} API");
				if (ModelState.IsValid) {
					_applicantService.SaveApplicantDetails(applicant);
					_log.LogInformation($"{message}: Applicant {applicant.Name} data saved successfully.");
					return Created("", applicant);
				}
				else {
					_log.LogError($"{message}: BadRequest - API Accessing with Invalid parameter or data.");
					return BadRequest();
				}
			}
			catch (System.Exception ex) {
				_log.LogError(ex, $"{message}: There was an error while accessing API");
				return BadRequest();
			}
		}

		// PUT api/<ApplicantController>/5
		[HttpPut("{id}")]
		[SwaggerRequestExample(typeof(Applicant), typeof(ApplicantExamplePut))]
		public IActionResult Put(int id, Applicant applicant) {
			message = "Applicant:Put";
			try {
				_log.LogInformation($"Accessing {message} API");
				if (applicant == null || applicant.Id != id) {
					_log.LogError($"{message}: BadRequest - API Accessing with Invalid parameter.");
					return BadRequest();
				}

				var applicantData = _applicantService.GetApplicantById(id);
				if (applicantData == null) {
					_log.LogInformation($"{message}: Applicant details with Id: {id} not found.");
					return NotFound();
				}

				if (ModelState.IsValid) {
					applicantData.Name = applicant.Name;
					applicantData.FamilyName = applicant.FamilyName;
					applicantData.Address = applicant.Address;
					applicantData.CountryOfOrigin = applicant.CountryOfOrigin;
					applicantData.EmailAddress = applicant.EmailAddress;
					applicantData.Age = applicant.Age;
					applicantData.Hired = applicant.Hired;

					_applicantService.UpdateApplicantDetails(applicantData);
					_log.LogInformation($"{message}: Applicant {applicantData.Name} data Updated successfully.");
					return NoContent();
				}
				else {
					_log.LogError($"{message}: BadRequest - API Accessing with Invalid parameter or data.");
					return BadRequest();
				}
			}
			catch (System.Exception ex) {
				_log.LogError(ex, $"{message}: There was an error while accessing API");
				return BadRequest();
			}
		}

		// DELETE api/<ApplicantController>/5
		[HttpDelete("{id}")]
		public IActionResult Delete(int id) {
			message = "Applicant:Delete";
			try {
				_log.LogInformation($"Accessing {message} API");
				var applicant = _applicantService.GetApplicantById(id);

				if (applicant == null) {
					_log.LogInformation($"{message}: Applicant details with Id: {id} not found.");
					return NotFound();
				}

				_applicantService.DeleteApplicantDetails(applicant);
				_log.LogInformation($"{message}: Applicant {applicant.Name} data deleted successfully.");
				return NoContent();
			}
			catch (System.Exception ex) {
				_log.LogError(ex, $"{message}: There was an error while accessing API");
				return BadRequest();
			}
		}
	}
}
