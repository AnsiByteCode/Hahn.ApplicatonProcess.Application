(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.aurelia-dialog"],{

/***/ "./node_modules/aurelia-dialog/dist/native-modules/attach-focus.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttachFocus", function() { return AttachFocus; });
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-pal/dist/native-modules/aurelia-pal.js");


var AttachFocus = (function () {
    function AttachFocus(element) {
        this.element = element;
        this.value = true;
    }
    AttachFocus.inject = function () {
        return [aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].Element];
    };
    AttachFocus.prototype.attached = function () {
        if (this.value === '' || (this.value && this.value !== 'false')) {
            this.element.focus();
        }
    };
    AttachFocus.$resource = {
        type: 'attribute',
        name: 'attach-focus'
    };
    return AttachFocus;
}());


//# sourceMappingURL=attach-focus.js.map


/***/ }),

/***/ "./node_modules/aurelia-dialog/dist/native-modules/chunk.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Renderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createDialogCancelError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return invokeLifecycle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DialogController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return createDialogCloseError; });
var Renderer = (function () {
    function Renderer() {
    }
    Renderer.prototype.getDialogContainer = function () {
        throw new Error('DialogRenderer must implement getDialogContainer().');
    };
    Renderer.prototype.showDialog = function (dialogController) {
        throw new Error('DialogRenderer must implement showDialog().');
    };
    Renderer.prototype.hideDialog = function (dialogController) {
        throw new Error('DialogRenderer must implement hideDialog().');
    };
    return Renderer;
}());

function createDialogCancelError(output) {
    var error = new Error('Operation cancelled.');
    error.wasCancelled = true;
    error.output = output;
    return error;
}

function createDialogCloseError(output) {
    var error = new Error();
    error.wasCancelled = false;
    error.output = output;
    return error;
}

function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
        return new Promise(function (resolve) {
            resolve(instance[name](model));
        }).then(function (result) {
            if (result !== null && result !== undefined) {
                return result;
            }
            return true;
        });
    }
    return Promise.resolve(true);
}

var DialogController = (function () {
    function DialogController(renderer, settings, resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
        this.settings = settings;
        this.renderer = renderer;
    }
    DialogController.prototype.releaseResources = function (result) {
        var _this = this;
        return invokeLifecycle(this.controller.viewModel || {}, 'deactivate', result)
            .then(function () { return _this.renderer.hideDialog(_this); })
            .then(function () {
            _this.controller.unbind();
        });
    };
    DialogController.prototype.cancelOperation = function () {
        if (!this.settings.rejectOnCancel) {
            return { wasCancelled: true };
        }
        throw createDialogCancelError();
    };
    DialogController.prototype.ok = function (output) {
        return this.close(true, output);
    };
    DialogController.prototype.cancel = function (output) {
        return this.close(false, output);
    };
    DialogController.prototype.error = function (output) {
        var _this = this;
        var closeError = createDialogCloseError(output);
        return this.releaseResources(closeError).then(function () { _this.reject(closeError); });
    };
    DialogController.prototype.close = function (ok, output) {
        var _this = this;
        if (this.closePromise) {
            return this.closePromise;
        }
        var dialogResult = { wasCancelled: !ok, output: output };
        return this.closePromise = invokeLifecycle(this.controller.viewModel || {}, 'canDeactivate', dialogResult)
            .catch(function (reason) {
            _this.closePromise = undefined;
            return Promise.reject(reason);
        }).then(function (canDeactivate) {
            if (!canDeactivate) {
                _this.closePromise = undefined;
                return _this.cancelOperation();
            }
            return _this.releaseResources(dialogResult).then(function () {
                if (!_this.settings.rejectOnCancel || ok) {
                    _this.resolve(dialogResult);
                }
                else {
                    _this.reject(createDialogCancelError(output));
                }
                return { wasCancelled: false };
            }).catch(function (reason) {
                _this.closePromise = undefined;
                return Promise.reject(reason);
            });
        });
    };
    DialogController.inject = [Renderer];
    return DialogController;
}());


//# sourceMappingURL=chunk.js.map


/***/ }),

/***/ "./node_modules/aurelia-dialog/dist/native-modules/default-styles.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var css = "ux-dialog-overlay{bottom:0;left:0;position:fixed;top:0;right:0;opacity:0}ux-dialog-overlay.active{opacity:1}ux-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;position:fixed;top:0;right:0;bottom:0;left:0;-webkit-overflow-scrolling:touch}ux-dialog-container.active{opacity:1}ux-dialog-container>div{padding:30px}ux-dialog-container>div>div{width:100%;display:block;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto}ux-dialog-container,ux-dialog-container>div,ux-dialog-container>div>div{outline:0}ux-dialog{width:100%;display:table;box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto;border-image-source:none;border-image-slice:100%;border-image-width:1;border-image-outset:0;border-image-repeat:initial;background:#fff}ux-dialog>ux-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ux-dialog>ux-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:none;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ux-dialog>ux-dialog-body{display:block;padding:16px}ux-dialog>ux-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ux-dialog>ux-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ux-dialog>ux-dialog-footer button:disabled{cursor:default;opacity:.45}ux-dialog>ux-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ux-dialog-open{overflow:hidden}";

/* harmony default export */ __webpack_exports__["default"] = (css);
//# sourceMappingURL=default-styles.js.map


/***/ }),

/***/ "./node_modules/aurelia-dialog/dist/native-modules/native-dialog-renderer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeDialogRenderer", function() { return NativeDialogRenderer; });
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-pal/dist/native-modules/aurelia-pal.js");
/* harmony import */ var aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/aurelia-dependency-injection/dist/native-modules/aurelia-dependency-injection.js");
/* harmony import */ var _ux_dialog_renderer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-renderer.js");




/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var containerTagName = 'dialog';
var body;
var NativeDialogRenderer = (function () {
    function NativeDialogRenderer() {
    }
    NativeDialogRenderer_1 = NativeDialogRenderer;
    NativeDialogRenderer.keyboardEventHandler = function (e) {
        var key = (e.code || e.key) === 'Enter' || e.keyCode === 13
            ? 'Enter'
            : undefined;
        if (!key) {
            return;
        }
        var top = NativeDialogRenderer_1.dialogControllers[NativeDialogRenderer_1.dialogControllers.length - 1];
        if (!top || !top.settings.keyboard) {
            return;
        }
        var keyboard = top.settings.keyboard;
        if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
            top.ok();
        }
    };
    NativeDialogRenderer.trackController = function (dialogController) {
        if (!NativeDialogRenderer_1.dialogControllers.length) {
            aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].addEventListener('keyup', NativeDialogRenderer_1.keyboardEventHandler, false);
        }
        NativeDialogRenderer_1.dialogControllers.push(dialogController);
    };
    NativeDialogRenderer.untrackController = function (dialogController) {
        var i = NativeDialogRenderer_1.dialogControllers.indexOf(dialogController);
        if (i !== -1) {
            NativeDialogRenderer_1.dialogControllers.splice(i, 1);
        }
        if (!NativeDialogRenderer_1.dialogControllers.length) {
            aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].removeEventListener('keyup', NativeDialogRenderer_1.keyboardEventHandler, false);
        }
    };
    NativeDialogRenderer.prototype.getOwnElements = function (parent, selector) {
        var elements = parent.querySelectorAll(selector);
        var own = [];
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].parentElement === parent) {
                own.push(elements[i]);
            }
        }
        return own;
    };
    NativeDialogRenderer.prototype.attach = function (dialogController) {
        if (dialogController.settings.restoreFocus) {
            this.lastActiveElement = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].activeElement;
        }
        var spacingWrapper = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].createElement('div');
        spacingWrapper.appendChild(this.anchor);
        this.dialogContainer = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].createElement(containerTagName);
        if (window.dialogPolyfill) {
            window.dialogPolyfill.registerDialog(this.dialogContainer);
        }
        this.dialogContainer.appendChild(spacingWrapper);
        var lastContainer = this.getOwnElements(this.host, containerTagName).pop();
        if (lastContainer && lastContainer.parentElement) {
            this.host.insertBefore(this.dialogContainer, lastContainer.nextSibling);
        }
        else {
            this.host.insertBefore(this.dialogContainer, this.host.firstChild);
        }
        dialogController.controller.attached();
        this.host.classList.add('ux-dialog-open');
    };
    NativeDialogRenderer.prototype.detach = function (dialogController) {
        if (this.dialogContainer.hasAttribute('open')) {
            this.dialogContainer.close();
        }
        this.host.removeChild(this.dialogContainer);
        dialogController.controller.detached();
        if (!NativeDialogRenderer_1.dialogControllers.length) {
            this.host.classList.remove('ux-dialog-open');
        }
        if (dialogController.settings.restoreFocus) {
            dialogController.settings.restoreFocus(this.lastActiveElement);
        }
    };
    NativeDialogRenderer.prototype.setAsActive = function () {
        this.dialogContainer.showModal();
        this.dialogContainer.classList.add('active');
    };
    NativeDialogRenderer.prototype.setAsInactive = function () {
        this.dialogContainer.classList.remove('active');
    };
    NativeDialogRenderer.prototype.setupEventHandling = function (dialogController) {
        this.stopPropagation = function (e) { e._aureliaDialogHostClicked = true; };
        this.closeDialogClick = function (e) {
            if (dialogController.settings.overlayDismiss && !e._aureliaDialogHostClicked) {
                dialogController.cancel();
            }
        };
        this.dialogCancel = function (e) {
            var keyboard = dialogController.settings.keyboard;
            var key = 'Escape';
            if (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1)) {
                dialogController.cancel();
            }
            else {
                e.preventDefault();
            }
        };
        var mouseEvent = dialogController.settings.mouseEvent || 'click';
        this.dialogContainer.addEventListener(mouseEvent, this.closeDialogClick);
        this.dialogContainer.addEventListener('cancel', this.dialogCancel);
        this.anchor.addEventListener(mouseEvent, this.stopPropagation);
    };
    NativeDialogRenderer.prototype.clearEventHandling = function (dialogController) {
        var mouseEvent = dialogController.settings.mouseEvent || 'click';
        this.dialogContainer.removeEventListener(mouseEvent, this.closeDialogClick);
        this.dialogContainer.removeEventListener('cancel', this.dialogCancel);
        this.anchor.removeEventListener(mouseEvent, this.stopPropagation);
    };
    NativeDialogRenderer.prototype.awaitTransition = function (setActiveInactive, ignore) {
        var _this = this;
        return new Promise(function (resolve) {
            var renderer = _this;
            var eventName = Object(_ux_dialog_renderer_js__WEBPACK_IMPORTED_MODULE_2__["transitionEvent"])();
            function onTransitionEnd(e) {
                if (e.target !== renderer.dialogContainer) {
                    return;
                }
                renderer.dialogContainer.removeEventListener(eventName, onTransitionEnd);
                resolve();
            }
            if (ignore || !Object(_ux_dialog_renderer_js__WEBPACK_IMPORTED_MODULE_2__["hasTransition"])(_this.dialogContainer)) {
                resolve();
            }
            else {
                _this.dialogContainer.addEventListener(eventName, onTransitionEnd);
            }
            setActiveInactive();
        });
    };
    NativeDialogRenderer.prototype.getDialogContainer = function () {
        return this.anchor || (this.anchor = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].createElement('div'));
    };
    NativeDialogRenderer.prototype.showDialog = function (dialogController) {
        var _this = this;
        if (!body) {
            body = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].querySelector('body');
        }
        if (dialogController.settings.host) {
            this.host = dialogController.settings.host;
        }
        else {
            this.host = body;
        }
        var settings = dialogController.settings;
        this.attach(dialogController);
        if (typeof settings.position === 'function') {
            settings.position(this.dialogContainer);
        }
        NativeDialogRenderer_1.trackController(dialogController);
        this.setupEventHandling(dialogController);
        return this.awaitTransition(function () { return _this.setAsActive(); }, dialogController.settings.ignoreTransitions);
    };
    NativeDialogRenderer.prototype.hideDialog = function (dialogController) {
        var _this = this;
        this.clearEventHandling(dialogController);
        NativeDialogRenderer_1.untrackController(dialogController);
        return this.awaitTransition(function () { return _this.setAsInactive(); }, dialogController.settings.ignoreTransitions)
            .then(function () { _this.detach(dialogController); });
    };
    var NativeDialogRenderer_1;
    NativeDialogRenderer.dialogControllers = [];
    NativeDialogRenderer = NativeDialogRenderer_1 = __decorate([
        Object(aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["transient"])()
    ], NativeDialogRenderer);
    return NativeDialogRenderer;
}());


//# sourceMappingURL=native-dialog-renderer.js.map


/***/ }),

/***/ "./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-body.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UxDialogBody", function() { return UxDialogBody; });
var UxDialogBody = (function () {
    function UxDialogBody() {
    }
    UxDialogBody.$view = "<template><slot></slot></template>";
    UxDialogBody.$resource = 'ux-dialog-body';
    return UxDialogBody;
}());


//# sourceMappingURL=ux-dialog-body.js.map


/***/ }),

/***/ "./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-footer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UxDialogFooter", function() { return UxDialogFooter; });
/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-dialog/dist/native-modules/chunk.js");


var UxDialogFooter = (function () {
    function UxDialogFooter(controller) {
        this.controller = controller;
        this.buttons = [];
        this.useDefaultButtons = false;
    }
    UxDialogFooter.isCancelButton = function (value) {
        return value === 'Cancel';
    };
    UxDialogFooter.prototype.close = function (buttonValue) {
        if (UxDialogFooter.isCancelButton(buttonValue)) {
            this.controller.cancel(buttonValue);
        }
        else {
            this.controller.ok(buttonValue);
        }
    };
    UxDialogFooter.prototype.useDefaultButtonsChanged = function (newValue) {
        if (newValue) {
            this.buttons = ['Cancel', 'Ok'];
        }
    };
    UxDialogFooter.inject = [_chunk_js__WEBPACK_IMPORTED_MODULE_0__["d"]];
    UxDialogFooter.$view = "<template>\n  <slot></slot>\n  <template if.bind=\"buttons.length > 0\">\n    <button type=\"button\"\n      class=\"btn btn-default\"\n      repeat.for=\"button of buttons\"\n      click.trigger=\"close(button)\">\n      ${button}\n    </button>\n  </template>\n</template>";
    UxDialogFooter.$resource = {
        name: 'ux-dialog-footer',
        bindables: ['buttons', 'useDefaultButtons']
    };
    return UxDialogFooter;
}());


//# sourceMappingURL=ux-dialog-footer.js.map


/***/ }),

/***/ "./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-header.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UxDialogHeader", function() { return UxDialogHeader; });
/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-dialog/dist/native-modules/chunk.js");


var UxDialogHeader = (function () {
    function UxDialogHeader(controller) {
        this.controller = controller;
    }
    UxDialogHeader.prototype.bind = function () {
        if (typeof this.showCloseButton !== 'boolean') {
            this.showCloseButton = !this.controller.settings.lock;
        }
    };
    UxDialogHeader.inject = [_chunk_js__WEBPACK_IMPORTED_MODULE_0__["d"]];
    UxDialogHeader.$view = "<template>\n  <button\n    type=\"button\"\n    class=\"dialog-close\"\n    aria-label=\"Close\"\n    if.bind=\"showCloseButton\"\n    click.trigger=\"controller.cancel()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n\n  <div class=\"dialog-header-content\">\n    <slot></slot>\n  </div>\n</template>";
    UxDialogHeader.$resource = {
        name: 'ux-dialog-header',
        bindables: ['showCloseButton']
    };
    return UxDialogHeader;
}());


//# sourceMappingURL=ux-dialog-header.js.map


/***/ }),

/***/ "./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-renderer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogRenderer", function() { return DialogRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UxDialogRenderer", function() { return DialogRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasTransition", function() { return hasTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transitionEvent", function() { return transitionEvent; });
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-pal/dist/native-modules/aurelia-pal.js");
/* harmony import */ var aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/aurelia-dependency-injection/dist/native-modules/aurelia-dependency-injection.js");



var containerTagName = 'ux-dialog-container';
var overlayTagName = 'ux-dialog-overlay';
var transitionEvent = (function () {
    var transition;
    return function () {
        if (transition) {
            return transition;
        }
        var el = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].createElement('fakeelement');
        var transitions = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
        };
        for (var t in transitions) {
            if (el.style[t] !== undefined) {
                transition = transitions[t];
                return transition;
            }
        }
        return '';
    };
})();
var hasTransition = (function () {
    var unprefixedName = 'transitionDuration';
    var prefixedNames = ['webkitTransitionDuration', 'oTransitionDuration'];
    var el;
    var transitionDurationName;
    return function (element) {
        if (!el) {
            el = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].createElement('fakeelement');
            if (unprefixedName in el.style) {
                transitionDurationName = unprefixedName;
            }
            else {
                transitionDurationName = prefixedNames.find(function (prefixed) { return (prefixed in el.style); });
            }
        }
        return !!transitionDurationName && !!(aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].getComputedStyle(element)[transitionDurationName]
            .split(',')
            .find(function (duration) { return !!parseFloat(duration); }));
    };
})();
var body;
function getActionKey(e) {
    if ((e.code || e.key) === 'Escape' || e.keyCode === 27) {
        return 'Escape';
    }
    if ((e.code || e.key) === 'Enter' || e.keyCode === 13) {
        return 'Enter';
    }
    return undefined;
}
var DialogRenderer = (function () {
    function DialogRenderer() {
    }
    DialogRenderer.keyboardEventHandler = function (e) {
        var key = getActionKey(e);
        if (!key) {
            return;
        }
        var top = DialogRenderer.dialogControllers[DialogRenderer.dialogControllers.length - 1];
        if (!top || !top.settings.keyboard) {
            return;
        }
        var keyboard = top.settings.keyboard;
        if (key === 'Escape'
            && (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
            top.cancel();
        }
        else if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
            top.ok();
        }
    };
    DialogRenderer.trackController = function (dialogController) {
        var trackedDialogControllers = DialogRenderer.dialogControllers;
        if (!trackedDialogControllers.length) {
            aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].addEventListener(dialogController.settings.keyEvent || 'keyup', DialogRenderer.keyboardEventHandler, false);
        }
        trackedDialogControllers.push(dialogController);
    };
    DialogRenderer.untrackController = function (dialogController) {
        var trackedDialogControllers = DialogRenderer.dialogControllers;
        var i = trackedDialogControllers.indexOf(dialogController);
        if (i !== -1) {
            trackedDialogControllers.splice(i, 1);
        }
        if (!trackedDialogControllers.length) {
            aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].removeEventListener(dialogController.settings.keyEvent || 'keyup', DialogRenderer.keyboardEventHandler, false);
        }
    };
    DialogRenderer.prototype.getOwnElements = function (parent, selector) {
        var elements = parent.querySelectorAll(selector);
        var own = [];
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].parentElement === parent) {
                own.push(elements[i]);
            }
        }
        return own;
    };
    DialogRenderer.prototype.attach = function (dialogController) {
        if (dialogController.settings.restoreFocus) {
            this.lastActiveElement = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].activeElement;
        }
        var spacingWrapper = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].createElement('div');
        spacingWrapper.appendChild(this.anchor);
        var dialogContainer = this.dialogContainer = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].createElement(containerTagName);
        dialogContainer.appendChild(spacingWrapper);
        var dialogOverlay = this.dialogOverlay = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].createElement(overlayTagName);
        var zIndex = typeof dialogController.settings.startingZIndex === 'number'
            ? dialogController.settings.startingZIndex + ''
            : 'auto';
        dialogOverlay.style.zIndex = zIndex;
        dialogContainer.style.zIndex = zIndex;
        var host = this.host;
        var lastContainer = this.getOwnElements(host, containerTagName).pop();
        if (lastContainer && lastContainer.parentElement) {
            host.insertBefore(dialogContainer, lastContainer.nextSibling);
            host.insertBefore(dialogOverlay, lastContainer.nextSibling);
        }
        else {
            host.insertBefore(dialogContainer, host.firstChild);
            host.insertBefore(dialogOverlay, host.firstChild);
        }
        dialogController.controller.attached();
        host.classList.add('ux-dialog-open');
    };
    DialogRenderer.prototype.detach = function (dialogController) {
        var host = this.host;
        host.removeChild(this.dialogOverlay);
        host.removeChild(this.dialogContainer);
        dialogController.controller.detached();
        if (!DialogRenderer.dialogControllers.length) {
            host.classList.remove('ux-dialog-open');
        }
        if (dialogController.settings.restoreFocus) {
            dialogController.settings.restoreFocus(this.lastActiveElement);
        }
    };
    DialogRenderer.prototype.setAsActive = function () {
        this.dialogOverlay.classList.add('active');
        this.dialogContainer.classList.add('active');
    };
    DialogRenderer.prototype.setAsInactive = function () {
        this.dialogOverlay.classList.remove('active');
        this.dialogContainer.classList.remove('active');
    };
    DialogRenderer.prototype.setupEventHandling = function (dialogController) {
        this.stopPropagation = function (e) { e._aureliaDialogHostClicked = true; };
        this.closeDialogClick = function (e) {
            if (dialogController.settings.overlayDismiss && !e._aureliaDialogHostClicked) {
                dialogController.cancel();
            }
        };
        var mouseEvent = dialogController.settings.mouseEvent || 'click';
        this.dialogContainer.addEventListener(mouseEvent, this.closeDialogClick);
        this.anchor.addEventListener(mouseEvent, this.stopPropagation);
    };
    DialogRenderer.prototype.clearEventHandling = function (dialogController) {
        var mouseEvent = dialogController.settings.mouseEvent || 'click';
        this.dialogContainer.removeEventListener(mouseEvent, this.closeDialogClick);
        this.anchor.removeEventListener(mouseEvent, this.stopPropagation);
    };
    DialogRenderer.prototype.centerDialog = function () {
        var child = this.dialogContainer.children[0];
        var vh = Math.max(aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);
        child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
        child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
    };
    DialogRenderer.prototype.awaitTransition = function (setActiveInactive, ignore) {
        var _this = this;
        return new Promise(function (resolve) {
            var renderer = _this;
            var eventName = transitionEvent();
            function onTransitionEnd(e) {
                if (e.target !== renderer.dialogContainer) {
                    return;
                }
                renderer.dialogContainer.removeEventListener(eventName, onTransitionEnd);
                resolve();
            }
            if (ignore || !hasTransition(_this.dialogContainer)) {
                resolve();
            }
            else {
                _this.dialogContainer.addEventListener(eventName, onTransitionEnd);
            }
            setActiveInactive();
        });
    };
    DialogRenderer.prototype.getDialogContainer = function () {
        return this.anchor || (this.anchor = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].createElement('div'));
    };
    DialogRenderer.prototype.showDialog = function (dialogController) {
        var _this = this;
        if (!body) {
            body = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["DOM"].querySelector('body');
        }
        if (dialogController.settings.host) {
            this.host = dialogController.settings.host;
        }
        else {
            this.host = body;
        }
        var settings = dialogController.settings;
        this.attach(dialogController);
        if (typeof settings.position === 'function') {
            settings.position(this.dialogContainer, this.dialogOverlay);
        }
        else if (!settings.centerHorizontalOnly) {
            this.centerDialog();
        }
        DialogRenderer.trackController(dialogController);
        this.setupEventHandling(dialogController);
        return this.awaitTransition(function () { return _this.setAsActive(); }, dialogController.settings.ignoreTransitions);
    };
    DialogRenderer.prototype.hideDialog = function (dialogController) {
        var _this = this;
        this.clearEventHandling(dialogController);
        DialogRenderer.untrackController(dialogController);
        return this.awaitTransition(function () { return _this.setAsInactive(); }, dialogController.settings.ignoreTransitions)
            .then(function () { _this.detach(dialogController); });
    };
    DialogRenderer.dialogControllers = [];
    return DialogRenderer;
}());
Object(aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["transient"])()(DialogRenderer);


//# sourceMappingURL=ux-dialog-renderer.js.map


/***/ }),

/***/ "./node_modules/aurelia-dialog/dist/native-modules/ux-dialog.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UxDialog", function() { return UxDialog; });
var UxDialog = (function () {
    function UxDialog() {
    }
    UxDialog.$view = "<template><slot></slot></template>";
    UxDialog.$resource = 'ux-dialog';
    return UxDialog;
}());


//# sourceMappingURL=ux-dialog.js.map


/***/ }),

/***/ "aurelia-dialog":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultDialogSettings", function() { return DefaultDialogSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogConfiguration", function() { return DialogConfiguration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogService", function() { return DialogService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configure", function() { return configure; });
/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-dialog/dist/native-modules/chunk.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogController", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createDialogCancelError", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createDialogCloseError", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__["e"]; });

/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/aurelia-pal/dist/native-modules/aurelia-pal.js");
/* harmony import */ var aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/aurelia-dependency-injection/dist/native-modules/aurelia-dependency-injection.js");
/* harmony import */ var aurelia_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/aurelia-templating/dist/native-modules/aurelia-templating.js");






var DefaultDialogSettings = (function () {
    function DefaultDialogSettings() {
        this.lock = true;
        this.startingZIndex = 1000;
        this.centerHorizontalOnly = false;
        this.rejectOnCancel = false;
        this.ignoreTransitions = false;
        this.restoreFocus = function (lastActiveElement) { return lastActiveElement.focus(); };
    }
    return DefaultDialogSettings;
}());

var RENDERRERS = {
    ux: function () { return __webpack_require__.e(/* import() */ "npm.aurelia-dialog").then(__webpack_require__.bind(null, "./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-renderer.js")).then(function (m) { return m.DialogRenderer; }); },
    native: function () { return __webpack_require__.e(/* import() */ "npm.aurelia-dialog").then(__webpack_require__.bind(null, "./node_modules/aurelia-dialog/dist/native-modules/native-dialog-renderer.js")).then(function (m) { return m.NativeDialogRenderer; }); }
};
var DEFAULT_RESOURCES = {
    'ux-dialog': function () { return __webpack_require__.e(/* import() */ "npm.aurelia-dialog").then(__webpack_require__.bind(null, "./node_modules/aurelia-dialog/dist/native-modules/ux-dialog.js")).then(function (m) { return m.UxDialog; }); },
    'ux-dialog-header': function () { return __webpack_require__.e(/* import() */ "npm.aurelia-dialog").then(__webpack_require__.bind(null, "./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-header.js")).then(function (m) { return m.UxDialogHeader; }); },
    'ux-dialog-body': function () { return __webpack_require__.e(/* import() */ "npm.aurelia-dialog").then(__webpack_require__.bind(null, "./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-body.js")).then(function (m) { return m.UxDialogBody; }); },
    'ux-dialog-footer': function () { return __webpack_require__.e(/* import() */ "npm.aurelia-dialog").then(__webpack_require__.bind(null, "./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-footer.js")).then(function (m) { return m.UxDialogFooter; }); },
    'attach-focus': function () { return __webpack_require__.e(/* import() */ "npm.aurelia-dialog").then(__webpack_require__.bind(null, "./node_modules/aurelia-dialog/dist/native-modules/attach-focus.js")).then(function (m) { return m.AttachFocus; }); }
};
var DEFAULT_CSS_TEXT = function () { return __webpack_require__.e(/* import() */ "npm.aurelia-dialog").then(__webpack_require__.bind(null, "./node_modules/aurelia-dialog/dist/native-modules/default-styles.js")).then(function (cssM) { return cssM['default']; }); };
var DialogConfiguration = (function () {
    function DialogConfiguration(frameworkConfiguration, applySetter) {
        var _this = this;
        this.renderer = 'ux';
        this.cssText = DEFAULT_CSS_TEXT;
        this.resources = [];
        this.fwConfig = frameworkConfiguration;
        this.settings = frameworkConfiguration.container.get(DefaultDialogSettings);
        applySetter(function () { return _this._apply(); });
    }
    DialogConfiguration.prototype._apply = function () {
        var _this = this;
        var renderer = this.renderer;
        var cssText = this.cssText;
        return Promise
            .all([
            typeof renderer === 'string' ? RENDERRERS[renderer]() : renderer,
            cssText
                ? typeof cssText === 'string'
                    ? cssText
                    : cssText()
                : ''
        ])
            .then(function (_a) {
            var rendererImpl = _a[0], $cssText = _a[1];
            var fwConfig = _this.fwConfig;
            fwConfig.transient(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"], rendererImpl);
            if ($cssText) {
                aurelia_pal__WEBPACK_IMPORTED_MODULE_1__["DOM"].injectStyles($cssText);
            }
            return Promise
                .all(_this.resources.map(function (name) { return DEFAULT_RESOURCES[name](); }))
                .then(function (modules) {
                fwConfig.globalResources(modules);
            });
        });
    };
    DialogConfiguration.prototype.useDefaults = function () {
        return this
            .useRenderer('ux')
            .useCSS(DEFAULT_CSS_TEXT)
            .useStandardResources();
    };
    DialogConfiguration.prototype.useStandardResources = function () {
        Object.keys(DEFAULT_RESOURCES).forEach(this.useResource, this);
        return this;
    };
    DialogConfiguration.prototype.useResource = function (resourceName) {
        this.resources.push(resourceName);
        return this;
    };
    DialogConfiguration.prototype.useRenderer = function (renderer, settings) {
        this.renderer = renderer;
        if (settings) {
            Object.assign(this.settings, settings);
        }
        return this;
    };
    DialogConfiguration.prototype.useCSS = function (cssText) {
        this.cssText = cssText;
        return this;
    };
    return DialogConfiguration;
}());

function whenClosed(onfulfilled, onrejected) {
    return this.then(function (r) { return r.wasCancelled ? r : r.closeResult; }).then(onfulfilled, onrejected);
}
function asDialogOpenPromise(promise) {
    promise.whenClosed = whenClosed;
    return promise;
}
var DialogService = (function () {
    function DialogService(container, compositionEngine, defaultSettings) {
        this.controllers = [];
        this.hasOpenDialog = false;
        this.hasActiveDialog = false;
        this.container = container;
        this.compositionEngine = compositionEngine;
        this.defaultSettings = defaultSettings;
    }
    DialogService.prototype.validateSettings = function (settings) {
        if (!settings.viewModel && !settings.view) {
            throw new Error('Invalid Dialog Settings. You must provide "viewModel", "view" or both.');
        }
    };
    DialogService.prototype.createCompositionContext = function (childContainer, host, settings) {
        return {
            container: childContainer.parent,
            childContainer: childContainer,
            bindingContext: null,
            viewResources: null,
            model: settings.model,
            view: settings.view,
            viewModel: settings.viewModel,
            viewSlot: new aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewSlot"](host, true),
            host: host
        };
    };
    DialogService.prototype.ensureViewModel = function (compositionContext) {
        if (typeof compositionContext.viewModel === 'object') {
            return Promise.resolve(compositionContext);
        }
        return this.compositionEngine.ensureViewModel(compositionContext);
    };
    DialogService.prototype._cancelOperation = function (rejectOnCancel) {
        if (!rejectOnCancel) {
            return { wasCancelled: true };
        }
        throw Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["b"])();
    };
    DialogService.prototype.composeAndShowDialog = function (compositionContext, dialogController) {
        var _this = this;
        if (!compositionContext.viewModel) {
            compositionContext.bindingContext = { controller: dialogController };
        }
        return this.compositionEngine
            .compose(compositionContext)
            .then(function (controller) {
            dialogController.controller = controller;
            return dialogController.renderer
                .showDialog(dialogController)
                .then(function () {
                _this.controllers.push(dialogController);
                _this.hasActiveDialog = _this.hasOpenDialog = !!_this.controllers.length;
            }, function (reason) {
                if (controller.viewModel) {
                    Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["c"])(controller.viewModel, 'deactivate');
                }
                return Promise.reject(reason);
            });
        });
    };
    DialogService.prototype.createSettings = function (settings) {
        settings = Object.assign({}, this.defaultSettings, settings);
        if (typeof settings.keyboard !== 'boolean' && !settings.keyboard) {
            settings.keyboard = !settings.lock;
        }
        if (typeof settings.overlayDismiss !== 'boolean') {
            settings.overlayDismiss = !settings.lock;
        }
        Object.defineProperty(settings, 'rejectOnCancel', {
            writable: false,
            configurable: true,
            enumerable: true
        });
        this.validateSettings(settings);
        return settings;
    };
    DialogService.prototype.open = function (settings) {
        var _this = this;
        if (settings === void 0) { settings = {}; }
        settings = this.createSettings(settings);
        var childContainer = settings.childContainer || this.container.createChild();
        var resolveCloseResult;
        var rejectCloseResult;
        var closeResult = new Promise(function (resolve, reject) {
            resolveCloseResult = resolve;
            rejectCloseResult = reject;
        });
        var dialogController = childContainer.invoke(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["d"], [settings, resolveCloseResult, rejectCloseResult]);
        childContainer.registerInstance(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["d"], dialogController);
        closeResult.then(function () {
            removeController(_this, dialogController);
        }, function () {
            removeController(_this, dialogController);
        });
        var compositionContext = this.createCompositionContext(childContainer, dialogController.renderer.getDialogContainer(), dialogController.settings);
        var openResult = this.ensureViewModel(compositionContext).then(function (compositionContext) {
            if (!compositionContext.viewModel) {
                return true;
            }
            return Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["c"])(compositionContext.viewModel, 'canActivate', dialogController.settings.model);
        }).then(function (canActivate) {
            if (!canActivate) {
                return _this._cancelOperation(dialogController.settings.rejectOnCancel);
            }
            return _this.composeAndShowDialog(compositionContext, dialogController)
                .then(function () { return ({ controller: dialogController, closeResult: closeResult, wasCancelled: false }); });
        });
        return asDialogOpenPromise(openResult);
    };
    DialogService.prototype.closeAll = function () {
        return Promise.all(this.controllers.slice(0).map(function (controller) {
            if (!controller.settings.rejectOnCancel) {
                return controller.cancel().then(function (result) {
                    if (result.wasCancelled) {
                        return controller;
                    }
                    return null;
                });
            }
            return controller.cancel().then(function () { return null; }).catch(function (reason) {
                if (reason.wasCancelled) {
                    return controller;
                }
                throw reason;
            });
        })).then(function (unclosedControllers) { return unclosedControllers.filter(function (unclosed) { return !!unclosed; }); });
    };
    DialogService.inject = [aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_2__["Container"], aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["CompositionEngine"], DefaultDialogSettings];
    return DialogService;
}());
function removeController(service, dialogController) {
    var i = service.controllers.indexOf(dialogController);
    if (i !== -1) {
        service.controllers.splice(i, 1);
        service.hasActiveDialog = service.hasOpenDialog = !!service.controllers.length;
    }
}

function configure(frameworkConfig, callback) {
    var applyConfig = null;
    var config = new DialogConfiguration(frameworkConfig, function (apply) { applyConfig = apply; });
    if (typeof callback === 'function') {
        callback(config);
    }
    else {
        config.useDefaults();
    }
    return applyConfig();
}


//# sourceMappingURL=aurelia-dialog.js.map


/***/ })

}]);
//# sourceMappingURL=npm.aurelia-dialog.4468a80e85f24f4d610d.js.map