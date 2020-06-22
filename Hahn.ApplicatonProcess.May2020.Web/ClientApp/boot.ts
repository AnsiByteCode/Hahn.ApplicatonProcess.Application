import "isomorphic-fetch";
import { Aurelia, PLATFORM } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { I18N, TCustomAttribute } from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';
import { ValidationMessageProvider } from 'aurelia-validation';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "font-awesome/css/font-awesome.css";
declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) {
	aurelia.use.standardConfiguration();
	aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'));
	aurelia.use.plugin(PLATFORM.moduleName('aurelia-dialog'));
	aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
		let aliases = ['t', 'i18n'];
		// add aliases for 't' attribute
		TCustomAttribute.configureAliases(aliases);

		// register backend plugin
		instance.i18next.use(Backend);

		ValidationMessageProvider.prototype.getMessage = function (key) {
			const i18n = aurelia.container.get(I18N);
			const translation = i18n.tr(`errorMessages.${key}`);
			return this.parser.parse(translation);
		};

		// adapt options to your needs (see http://i18next.com/docs/options/)
		// make sure to return the promise of the setup method, in order to guarantee proper loading
		return instance.setup({
			backend: {                                  // <-- configure backend settings
				loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
			},
			attributes: aliases,
			lng: 'en',
			fallbackLng: 'en',
			debug: false
		});
	});
	if (IS_DEV_BUILD) {
		aurelia.use.developmentLogging();
	}

	aurelia.start().then(() => aurelia.setRoot("app/components/app/app"));
}
