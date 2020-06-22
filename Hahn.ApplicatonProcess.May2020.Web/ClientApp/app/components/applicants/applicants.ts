import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Applicant } from '../../models/applicant';
import { ConfirmModal } from '../shared/confirmmodal/confirmmodal';

export class Applicants {
	static inject = [HttpClient, DialogService]
	public applicants: Applicant[] | undefined;
	dialogService: any;
	http: HttpClient;
	constructor(http: HttpClient, dialogService: DialogService) {
		this.http = http;
		this.dialogService = dialogService;
		this.getApplicants();
	}

	getApplicants() {
		this.http.fetch('api/Applicant/GetAll')
			.then(result => result.json() as Promise<Applicant[]>)
			.then(data => {
				this.applicants = data;
			});
	}

	deleteApplicant(id) {
		this.dialogService.open({ viewModel: ConfirmModal, model: 'Are you sure you want to delete?' }).whenClosed((response: { wasCancelled: any; output: any; }) => {
			if (!response.wasCancelled) {
				this.http.delete('api/Applicant/' + id)
					.then(data => {
						this.getApplicants();
					});
			}
		});
	}
}
