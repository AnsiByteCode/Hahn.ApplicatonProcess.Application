import { Aurelia, PLATFORM } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";

export class App {
	configureRouter(config: RouterConfiguration, router: Router) {
		config.title = "Hahn";
		config.map([
			{
				route: ["", "home", "applicants"],
				name: "applicants",
				settings: { icon: "fa fa-users" },
				moduleId: "../applicants/applicants",
				nav: true,
				title: "Applicants"
			},
			{
				route: "applicants-manage",
				name: "applicants-manage",
				settings: { icon: "fa fa-user" },
				moduleId: "../applicants-manage/applicants-manage",
				nav: false,
				title: "Manage Applicant"
			}
		]);
	}
}
