/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"npm.aurelia-dialog","npm.aurelia-i18n","npm.babel","npm.bootstrap","npm.aurelia-validation","npm.aurelia-webpack-plugin","npm.es6-promise","npm.font-awesome","npm.webpack","npm.aurelia-binding","npm.aurelia-bootstrapper","npm.aurelia-dependency-injection","npm.aurelia-event-aggregator","npm.aurelia-fetch-client","npm.aurelia-framework","npm.aurelia-history-browser","npm.aurelia-history","npm.aurelia-loader-webpack","npm.aurelia-loader","npm.aurelia-logging-console","npm.aurelia-logging","npm.aurelia-metadata","npm.aurelia-pal-browser","npm.aurelia-pal","npm.aurelia-path","npm.aurelia-polyfills","npm.aurelia-route-recognizer","npm.aurelia-router","npm.aurelia-task-queue","npm.aurelia-templating-binding","npm.aurelia-templating-resources","npm.aurelia-templating-router","npm.aurelia-templating","npm.css-loader","npm.i18next-xhr-backend","npm.isomorphic-fetch","npm.jquery","npm.popper.js","npm.process","npm.whatwg-fetch"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/aurelia-webpack-plugin/runtime/empty-entry.js");
__webpack_require__("./node_modules/aurelia-webpack-plugin/runtime/pal-loader-entry.js");
__webpack_require__("./node_modules/es6-promise/auto.js");
module.exports = __webpack_require__("./node_modules/aurelia-bootstrapper/dist/native-modules/aurelia-bootstrapper.js");


/***/ }),

/***/ "app/components/app/app":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.configureRouter = function (config, router) {
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
    };
    return App;
}());



/***/ }),

/***/ "app/components/app/app.html":
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<template>\r\n\t<require from=\"../navmenu/navmenu\"></require>\r\n\t<require from=\"./app.scss\"></require>\r\n\t<navmenu></navmenu>\r\n\t<div class=\"container-fluid\">\r\n\t\t<router-view></router-view>\r\n\t</div>\r\n</template>\r\n";

/***/ }),

/***/ "app/components/app/app.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "@media (max-width:767px){.body-content{padding-top:50px}}.has-error>input,.has-error>select{border:1px solid red}.has-error>.help-block.validation-message{color:red}", ""]);



/***/ }),

/***/ "app/components/applicants-manage/applicants-manage":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicantManage", function() { return ApplicantManage; });
/* harmony import */ var aurelia_fetch_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-fetch-client/dist/native-modules/aurelia-fetch-client.js");
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("aurelia-dialog");
/* harmony import */ var _shared_confirmmodal_confirmmodal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("app/components/shared/confirmmodal/confirmmodal");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("aurelia-framework");
/* harmony import */ var aurelia_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("aurelia-validation");
/* harmony import */ var _shared_bootstrap_form_renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("app/components/shared/bootstrap-form-renderer");
/* harmony import */ var _models_applicant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("app/models/applicant");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/aurelia-router/dist/native-modules/aurelia-router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ApplicantManage = /** @class */ (function () {
    function ApplicantManage(http, dialogService, controllerFactory, router) {
        var _this = this;
        this.isFormChanged = false;
        this.isFormValid = false;
        this.controller = null;
        this.originalApplicant = new _models_applicant__WEBPACK_IMPORTED_MODULE_6__["Applicant"]();
        this.applicant = new _models_applicant__WEBPACK_IMPORTED_MODULE_6__["Applicant"]();
        this.validate = function () {
            _this.controller.validate().then(function (result) {
                if (result.valid) {
                    _this.isFormValid = true;
                }
                else {
                    _this.isFormValid = false;
                }
            });
        };
        this.http = http;
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new _shared_bootstrap_form_renderer__WEBPACK_IMPORTED_MODULE_5__["BootstrapFormRenderer"]());
        this.dialogService = dialogService;
        this.router = router;
        //this.controller.addObject(this.applicant);
        aurelia_validation__WEBPACK_IMPORTED_MODULE_4__["ValidationRules"].customRule('countryOfOrigin', function (value, obj) { return value !== null && value !== undefined && value !== "" && _this.isValidCountry(value); }, "\${$displayName} must be a valid country.");
        aurelia_validation__WEBPACK_IMPORTED_MODULE_4__["ValidationRules"]
            .ensure('name').required().minLength(5)
            .ensure('familyName').required().minLength(5)
            .ensure('address').required().minLength(10)
            .ensure('emailAddress').required().email()
            .ensure('countryOfOrigin').required().satisfiesRule('countryOfOrigin')
            .ensure('age').min(20).max(60)
            .on(this.applicant);
    }
    ApplicantManage.prototype.isValidCountry = function (arg) {
        try {
            debugger;
            return this.http.get('https://restcountries.eu/rest/v2/name/' + arg + '?fullText=true')
                .then(function (result) { if (result.status == 200) {
                return true;
            }
            else {
                return false;
            } })
                .catch(function (error) {
                alert('Error saving comment!');
                return false;
            });
        }
        catch (e) {
            return false;
        }
    };
    ApplicantManage.prototype.activate = function (parms) {
        var _this = this;
        var applicantId = parms.id;
        if (applicantId != undefined && applicantId > 0) {
            this.http.get('api/Applicant/' + applicantId)
                .then(function (result) { return result.json(); })
                .then(function (data) {
                _this.applicant = data;
            });
        }
    };
    ApplicantManage.prototype.change = function () {
        this.isFormChanged = true;
    };
    ApplicantManage.prototype.saveApplicant = function (applicant) {
        var _this = this;
        this.controller.validate().then(function (result) {
            if (result.valid) {
                _this.isFormChanged = true;
                var myPostData = {
                    Id: (applicant.id == undefined ? 0 : (Number)(applicant.id)),
                    Name: applicant.name,
                    FamilyName: applicant.familyName,
                    Address: applicant.address,
                    CountryOfOrigin: applicant.countryOfOrigin,
                    EmailAddress: applicant.emailAddress,
                    Age: (Number)(applicant.age),
                    Hired: (applicant.hired == undefined ? false : applicant.hired)
                };
                if (applicant.id == undefined || applicant.id <= 0) {
                    _this.http.fetch('api/Applicant/', {
                        method: "POST",
                        body: Object(aurelia_fetch_client__WEBPACK_IMPORTED_MODULE_0__["json"])(myPostData)
                    })
                        .then(function (response) {
                        debugger;
                        _this.router.navigate("applicants");
                    });
                }
                else {
                    _this.http.fetch('api/Applicant/' + applicant.id, {
                        method: "PUT",
                        body: Object(aurelia_fetch_client__WEBPACK_IMPORTED_MODULE_0__["json"])(myPostData)
                    })
                        .then(function (response) {
                        debugger;
                        _this.router.navigate("applicants");
                    });
                }
            }
            else {
                _this.isFormChanged = true;
                _this.isFormValid = false;
            }
        });
    };
    ApplicantManage.prototype.resetForm = function () {
        var _this = this;
        this.dialogService.open({ viewModel: _shared_confirmmodal_confirmmodal__WEBPACK_IMPORTED_MODULE_2__["ConfirmModal"], model: 'Are you sure you want to reset?' }).whenClosed(function (response) {
            if (!response.wasCancelled) {
                _this.applicant.name = null;
                _this.applicant.familyName = null;
                _this.applicant.address = null;
                _this.applicant.countryOfOrigin = null;
                _this.applicant.emailAddress = null;
                _this.applicant.age = null;
                _this.applicant.hired = false;
                _this.controller.reset();
                _this.isFormChanged = false;
            }
        });
    };
    ApplicantManage.inject = [aurelia_fetch_client__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__["DialogService"], aurelia_validation__WEBPACK_IMPORTED_MODULE_4__["ValidationControllerFactory"], aurelia_router__WEBPACK_IMPORTED_MODULE_7__["Router"]];
    __decorate([
        aurelia_framework__WEBPACK_IMPORTED_MODULE_3__["bindable"], aurelia_framework__WEBPACK_IMPORTED_MODULE_3__["observable"],
        __metadata("design:type", _models_applicant__WEBPACK_IMPORTED_MODULE_6__["Applicant"])
    ], ApplicantManage.prototype, "applicant", void 0);
    return ApplicantManage;
}());



/***/ }),

/***/ "app/components/applicants-manage/applicants-manage.html":
/***/ (function(module, exports) {

module.exports = "<template>\r\n\t<form class=\"form card\" submit.trigger=\"saveApplicant()\" change.delegate=\"change($event)\">\r\n\t\t<div class=\"card-block\">\r\n\t\t\t<div class=\"col-md-12\">\r\n\t\t\t\t<!--<h1>${applicant.id == undefined || applicant.id < 0 ? \"Add New Applicant\" : \"Update Applicant\"} </h1>-->\r\n\t\t\t\t<h1 t=\"applicants.manageTitle\">Manage Applicants</h1>\r\n\t\t\t\t<!--<div class=\"pull-right\">\r\n\t\t\t\t\t\t\t\t\t<a class=\"btn btn-default\" route-href=\"route: applicants\"><span class=\"glyphicon glyphicon-backward\"></span> Back to List</a>\r\n\t\t\t\t\t\t\t</div>-->\r\n\t\t\t\t<p t=\"applicants.titleDescription\">Please provide applicant details and submit the details</p>\r\n\t\t\t</div>\r\n\t\t\t<hr />\r\n\t\t\t<div class=\"col-md-12\">\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"name\" t=\"applicants.name\">Name</label>\r\n\t\t\t\t\t<input type=\"hidden\" id=\"applicantId\" name=\"applicantId\" value.bind=\"applicant.id\">\r\n\t\t\t\t\t<input name=\"name\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t placeholder='Name'\r\n\t\t\t\t\t\t\t\t value.bind=\"applicant.name & validate\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"family_name\" t=\"applicants.familyName\">Family Name</label>\r\n\t\t\t\t\t<input name=\"family_name\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t placeholder='Family Name'\r\n\t\t\t\t\t\t\t\t value.bind=\"applicant.familyName & validate\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"address\" t=\"applicants.address\">Address</label>\r\n\t\t\t\t\t<input name=\"address\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t placeholder='Address'\r\n\t\t\t\t\t\t\t\t value.bind=\"applicant.address & validate\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"countryOfOrigin\" t=\"applicants.countryOfOrigin\">Country of Origin</label>\r\n\t\t\t\t\t<input name=\"countryOfOrigin\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t placeholder='Country of Origin'\r\n\t\t\t\t\t\t\t\t value.bind=\"applicant.countryOfOrigin & validate\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"email\" t=\"applicants.email\">Email</label>\r\n\t\t\t\t\t<input name=\"email\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t placeholder='Email Address'\r\n\t\t\t\t\t\t\t\t value.bind=\"applicant.emailAddress & validate\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"age\" t=\"applicants.age\">Age</label>\r\n\t\t\t\t\t<input name=\"age\" class=\"form-control\" type=\"number\" min=\"20\" max=\"60\"\r\n\t\t\t\t\t\t\t\t placeholder='Age'\r\n\t\t\t\t\t\t\t\t value.bind=\"applicant.age & validate\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"hired\" t=\"applicants.hired\">Hired</label>\r\n\t\t\t\t\t<input name=\"hired\" type=\"checkbox\" checked.bind=\"applicant.hired & validate\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"card-footer\">\r\n\t\t\t<button type=\"submit\" class=\"btn btn-primary\" disabled.bind=\"isFormChanged && isFormValid\" click.delegate=\"saveApplicant(applicant)\" t=\"applicants.submitText\">\r\n\t\t\t\tSend\r\n\t\t\t</button>\r\n\t\t\t<button class=\"btn btn-secondary\" disabled.bind=\"!isFormChanged\" click.trigger=\"resetForm()\" t=\"applicants.resetText\">\r\n\t\t\t\tReset\r\n\t\t\t</button>\r\n\t\t</div>\r\n\t</form>\r\n</template>";

/***/ }),

/***/ "app/components/applicants/applicants":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Applicants", function() { return Applicants; });
/* harmony import */ var aurelia_fetch_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-fetch-client/dist/native-modules/aurelia-fetch-client.js");
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("aurelia-dialog");
/* harmony import */ var _shared_confirmmodal_confirmmodal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("app/components/shared/confirmmodal/confirmmodal");



var Applicants = /** @class */ (function () {
    function Applicants(http, dialogService) {
        this.http = http;
        this.dialogService = dialogService;
        this.getApplicants();
    }
    Applicants.prototype.getApplicants = function () {
        var _this = this;
        this.http.fetch('api/Applicant/GetAll')
            .then(function (result) { return result.json(); })
            .then(function (data) {
            _this.applicants = data;
        });
    };
    Applicants.prototype.deleteApplicant = function (id) {
        var _this = this;
        this.dialogService.open({ viewModel: _shared_confirmmodal_confirmmodal__WEBPACK_IMPORTED_MODULE_2__["ConfirmModal"], model: 'Are you sure you want to delete?' }).whenClosed(function (response) {
            if (!response.wasCancelled) {
                _this.http.delete('api/Applicant/' + id)
                    .then(function (data) {
                    _this.getApplicants();
                });
            }
        });
    };
    Applicants.inject = [aurelia_fetch_client__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__["DialogService"]];
    return Applicants;
}());



/***/ }),

/***/ "app/components/applicants/applicants.html":
/***/ (function(module, exports) {

module.exports = "<template>\r\n\r\n\t<div class=\"col-md-12 row\">\r\n\t\t<h1>\r\n\t\t\tApplicants\r\n\t\t\t<span class=\"text-sm-left\">\r\n\t\t\t\t<a class=\"btn btn-sm btn-info\" route-href=\"route: applicants-manage\" t=\"applicants.addButtonText\"><span class=\"glyphicon glyphicon-plus\"></span> Add New</a>\r\n\t\t\t</span>\r\n\t\t</h1>\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-md-12\">\r\n\t\t\t<p if.bind=\"!applicants\"><em>Loading...</em></p>\r\n\t\t\t<table if.bind=\"applicants\" class=\"table table-bordered table-sm\">\r\n\t\t\t\t<thead>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<th t=\"applicants.name\"></th>\r\n\t\t\t\t\t\t<th t=\"applicants.familyName\"></th>\r\n\t\t\t\t\t\t<th t=\"applicants.email\"></th>\r\n\t\t\t\t\t\t<th t=\"applicants.countryOfOrigin\"></th>\r\n\t\t\t\t\t\t<th t=\"applicants.age\"></th>\r\n\t\t\t\t\t\t<th t=\"applicants.hired\"></th>\r\n\t\t\t\t\t\t<th t=\"applicants.actions\"></th>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</thead>\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t<tr repeat.for=\"applicant of applicants\">\r\n\t\t\t\t\t\t<td>${ applicant.name }</td>\r\n\t\t\t\t\t\t<td>${ applicant.familyName }</td>\r\n\t\t\t\t\t\t<td>${ applicant.emailAddress }</td>\r\n\t\t\t\t\t\t<td>${ applicant.countryOfOrigin }</td>\r\n\t\t\t\t\t\t<td>${ applicant.age }</td>\r\n\t\t\t\t\t\t<td>${ applicant.hired == true ? \"Yes\":\"No\" }</td>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<a class=\"btn btn-sm btn-outline-info\" route-href=\"route: applicants-manage;params.bind: { id: applicant.id }\" t=\"applicants.editButtonText\">Edit</a>\r\n\t\t\t\t\t\t\t<a class=\"btn btn-sm btn-outline-danger\" href=\"#\" click.trigger=\"deleteApplicant(applicant.id)\" t=\"applicants.deleteButtonText\">Delete</a>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</tbody>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t</div>\r\n</template>";

/***/ }),

/***/ "app/components/navmenu/navmenu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Navmenu", function() { return Navmenu; });
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-router/dist/native-modules/aurelia-router.js");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("aurelia-framework");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Navmenu = /** @class */ (function () {
    function Navmenu(router) {
        this.router = router;
    }
    Navmenu = __decorate([
        aurelia_framework__WEBPACK_IMPORTED_MODULE_1__["autoinject"],
        __metadata("design:paramtypes", [aurelia_router__WEBPACK_IMPORTED_MODULE_0__["Router"]])
    ], Navmenu);
    return Navmenu;
}());



/***/ }),

/***/ "app/components/navmenu/navmenu.html":
/***/ (function(module, exports) {

module.exports = "<template>\r\n\t<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\r\n\t\t<a class=\"navbar-brand\" href=\"#/home\" t=\"apptitle\">Hahn</a>\r\n\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n\t\t\t<span class=\"navbar-toggler-icon\"></span>\r\n\t\t</button>\r\n\r\n\t\t<div class=\"navbar-collapse collapse\" id=\"navbarNav\">\r\n\t\t\t<ul class=\"navbar-nav\">\r\n\t\t\t\t<li repeat.for=\"row of router.navigation\" class=\"nav-item ${row.isActive ? 'active' : ''}\">\r\n                    <a href.bind=\"row.href\" class=\"nav-link\">\r\n                        <i class=\"${row.settings.icon}\"></i> ${row.title}\r\n                    </a>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t</nav>\r\n</template>\r\n";

/***/ }),

/***/ "app/components/shared/bootstrap-form-renderer":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BootstrapFormRenderer", function() { return BootstrapFormRenderer; });
var BootstrapFormRenderer = /** @class */ (function () {
    function BootstrapFormRenderer() {
    }
    BootstrapFormRenderer.prototype.render = function (instruction) {
        for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
            var _b = _a[_i], result = _b.result, elements = _b.elements;
            for (var _c = 0, elements_1 = elements; _c < elements_1.length; _c++) {
                var element = elements_1[_c];
                this.remove(element, result);
            }
        }
        for (var _d = 0, _e = instruction.render; _d < _e.length; _d++) {
            var _f = _e[_d], result = _f.result, elements = _f.elements;
            for (var _g = 0, elements_2 = elements; _g < elements_2.length; _g++) {
                var element = elements_2[_g];
                this.add(element, result);
            }
        }
    };
    BootstrapFormRenderer.prototype.add = function (element, result) {
        if (result.valid) {
            return;
        }
        var formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }
        // add the has-error class to the enclosing form-group div
        formGroup.classList.add('has-error');
        // add help-block
        var message = document.createElement('span');
        message.className = 'help-block validation-message';
        message.textContent = result.message;
        message.id = "validation-message-" + result.id;
        formGroup.appendChild(message);
    };
    BootstrapFormRenderer.prototype.remove = function (element, result) {
        if (result.valid) {
            return;
        }
        var formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }
        // remove help-block
        var message = formGroup.querySelector("#validation-message-" + result.id);
        if (message) {
            formGroup.removeChild(message);
            // remove the has-error class from the enclosing form-group div
            if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
                formGroup.classList.remove('has-error');
            }
        }
    };
    return BootstrapFormRenderer;
}());



/***/ }),

/***/ "app/components/shared/confirmmodal/confirmmodal":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmModal", function() { return ConfirmModal; });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aurelia-dialog");

var ConfirmModal = /** @class */ (function () {
    function ConfirmModal(controller) {
        this.controller = controller;
        this.answer = null;
        controller.settings.lock = true;
        controller.settings.centerHorizontalOnly = true;
    }
    ConfirmModal.prototype.activate = function (message) {
        this.message = message;
    };
    ConfirmModal.inject = [aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__["DialogController"]];
    return ConfirmModal;
}());



/***/ }),

/***/ "app/components/shared/confirmmodal/confirmmodal.html":
/***/ (function(module, exports) {

module.exports = "<template>\n\t<ux-dialog>\n\t\t<ux-dialog-body>\n\t\t\t<h5>${message}</h5>\n\t\t</ux-dialog-body>\n\t\t<ux-dialog-footer>\n\t\t\t<button click.trigger=\"controller.cancel()\">Cancel</button>\n\t\t\t<button click.trigger=\"controller.ok()\">Ok</button>\n\t\t</ux-dialog-footer>\n\t</ux-dialog>\n</template>";

/***/ }),

/***/ "app/models/applicant":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Applicant", function() { return Applicant; });
var Applicant = /** @class */ (function () {
    function Applicant() {
    }
    return Applicant;
}());



/***/ }),

/***/ "boot":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configure", function() { return configure; });
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("aurelia-framework");
/* harmony import */ var aurelia_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("aurelia-i18n");
/* harmony import */ var i18next_xhr_backend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/i18next-xhr-backend/dist/esm/i18nextXHRBackend.js");
/* harmony import */ var aurelia_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("aurelia-validation");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/bootstrap/dist/js/bootstrap.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var font_awesome_css_font_awesome_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/font-awesome/css/font-awesome.css");
/* harmony import */ var font_awesome_css_font_awesome_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(font_awesome_css_font_awesome_css__WEBPACK_IMPORTED_MODULE_7__);








function configure(aurelia) {
    aurelia.use.standardConfiguration();
    aurelia.use.plugin('aurelia-validation');
    aurelia.use.plugin('aurelia-dialog');
    aurelia.use.plugin('aurelia-i18n', function (instance) {
        var aliases = ['t', 'i18n'];
        // add aliases for 't' attribute
        aurelia_i18n__WEBPACK_IMPORTED_MODULE_2__["TCustomAttribute"].configureAliases(aliases);
        // register backend plugin
        instance.i18next.use(i18next_xhr_backend__WEBPACK_IMPORTED_MODULE_3__["default"]);
        aurelia_validation__WEBPACK_IMPORTED_MODULE_4__["ValidationMessageProvider"].prototype.getMessage = function (key) {
            var i18n = aurelia.container.get(aurelia_i18n__WEBPACK_IMPORTED_MODULE_2__["I18N"]);
            var translation = i18n.tr("errorMessages." + key);
            return this.parser.parse(translation);
        };
        // adapt options to your needs (see http://i18next.com/docs/options/)
        // make sure to return the promise of the setup method, in order to guarantee proper loading
        return instance.setup({
            backend: {
                loadPath: './locales/{{lng}}/{{ns}}.json',
            },
            attributes: aliases,
            lng: 'en',
            fallbackLng: 'en',
            debug: false
        });
    });
    if (true) {
        aurelia.use.developmentLogging();
    }
    aurelia.start().then(function () { return aurelia.setRoot("app/components/app/app"); });
}


/***/ })

/******/ });
//# sourceMappingURL=app.dbe94cfbcb4967012b46.js.map