import { DialogController } from 'aurelia-dialog';

export class ConfirmModal {
	static inject = [DialogController];
	controller: any;
	answer: any;
	message: any;
	constructor(controller) {
		this.controller = controller;
		this.answer = null;

		controller.settings.lock = true;
		controller.settings.centerHorizontalOnly = true;
	}
	activate(message) {
		this.message = message;
	}
}