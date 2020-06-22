import { HttpClient, json } from 'aurelia-fetch-client';
import { DialogService } from 'aurelia-dialog';
import { ConfirmModal } from '../shared/confirmmodal/confirmmodal';
import { bindable, inject, observable } from 'aurelia-framework';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../shared/bootstrap-form-renderer';
import { Applicant } from '../../models/applicant';
import { Router } from 'aurelia-router';

export class ApplicantManage {
	static inject = [HttpClient, DialogService, ValidationControllerFactory, Router]
	http: HttpClient;
	router: Router;
	dialogService: any;
	isFormChanged: boolean = false;
	isFormValid: boolean = false;
	controller = null;
	originalApplicant = new Applicant();
	@bindable @observable applicant: Applicant = new Applicant();
	constructor(http: HttpClient, dialogService: DialogService, controllerFactory: ValidationControllerFactory, router: Router) {
		this.http = http;
		this.controller = controllerFactory.createForCurrentScope();
		this.controller.addRenderer(new BootstrapFormRenderer());
		this.dialogService = dialogService;
		this.router = router;
		//this.controller.addObject(this.applicant);

		ValidationRules.customRule('countryOfOrigin', (value, obj) => value !== null && value !== undefined && value !== "" && this.isValidCountry(value), "\${$displayName} must be a valid country.");

		ValidationRules
			.ensure('name').required().minLength(5)
			.ensure('familyName').required().minLength(5)
			.ensure('address').required().minLength(10)
			.ensure('emailAddress').required().email()
			.ensure('countryOfOrigin').required().satisfiesRule('countryOfOrigin')
			.ensure('age').min(20).max(60)
			.on(this.applicant);
	}

	isValidCountry(arg): any {
		try {
			debugger;
			return this.http.get('https://restcountries.eu/rest/v2/name/' + arg + '?fullText=true')
				.then(result => { if (result.status == 200) { return true; } else { return false; } })
				.catch(error => {
					alert('Error saving comment!');
					return false;
				});
		} catch (e) {
			return false;
		}
	}

	activate(parms) {
		var applicantId = parms.id;
		if (applicantId != undefined && applicantId > 0) {
			this.http.get('api/Applicant/' + applicantId)
				.then(result => result.json() as Promise<Applicant>)
				.then(data => {
					this.applicant = data;
				});
		}
	}

	change() {
		this.isFormChanged = true;
	}

	validate = () => {
		this.controller.validate().then(result => {
			if (result.valid) {
				this.isFormValid = true;
			} else {
				this.isFormValid = false;
			}
		});
	}

	saveApplicant(applicant: Applicant) {
		this.controller.validate().then(result => {
			if (result.valid) {
				this.isFormChanged = true;
				let myPostData =
				{
					Id: (applicant.id == undefined ? 0 : (Number)(applicant.id)),
					Name: applicant.name,
					FamilyName: applicant.familyName,
					Address: applicant.address,
					CountryOfOrigin: applicant.countryOfOrigin,
					EmailAddress: applicant.emailAddress,
					Age: (Number)(applicant.age),
					Hired: (applicant.hired == undefined ? false : applicant.hired)
				}

				if (applicant.id == undefined || applicant.id <= 0) {
					this.http.fetch('api/Applicant/',
						{
							method: "POST",
							body: json(myPostData)
						})
						.then(response => {
							debugger;
							this.router.navigate("applicants");
						});
				}
				else {
					this.http.fetch('api/Applicant/' + applicant.id,
						{
							method: "PUT",
							body: json(myPostData)
						})
						.then(response => {
							debugger;
							this.router.navigate("applicants");
						});
				}
			} else {
				this.isFormChanged = true;
				this.isFormValid = false;
			}
		});

	}

	resetForm() {
		this.dialogService.open({ viewModel: ConfirmModal, model: 'Are you sure you want to reset?' }).whenClosed((response: { wasCancelled: any; output: any; }) => {
			if (!response.wasCancelled) {
				this.applicant.name = null;
				this.applicant.familyName = null;
				this.applicant.address = null;
				this.applicant.countryOfOrigin = null;
				this.applicant.emailAddress = null;
				this.applicant.age = null;
				this.applicant.hired = false;
				this.controller.reset();
				this.isFormChanged = false;
			}
		});
	}
}
