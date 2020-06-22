(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.aurelia-webpack-plugin"],{

/***/ "./node_modules/aurelia-webpack-plugin/runtime/empty-entry.js":
/***/ (function(module, exports, __webpack_require__) {

// This file contains an empty module that does nothing.
// It's meant to be added as an entry point to the main bundle
// and helps reliably adding some Aurelia dependencies that are attached 
// to no module in particular, such as `includeAll` results or `aureliaApp`.
//
// Trying to attach those dependencies to, for example, 'aurelia-bootstrapper' 
// is unreliable if 'aurelia-bootstrapper' is in a DLL outside the bundle.
//
// Trying to attach to 'aurelia-loader-webpack' works well, unless a user
// configures a customized loader instead (unlikely, but in theory supported).


/***/ }),

/***/ "./node_modules/aurelia-webpack-plugin/runtime/pal-loader-entry.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-pal/dist/native-modules/aurelia-pal.js");
// With default aurelia-loader-webpack config, this module is added as an extra entry
// before any other code executes so that PAL.Loader is properly configured.
// There are several tricky points worth noticing.
// 
// We don't add aurelia-loader-webpack itself as an entry point (used to until 2.0 RC2)
// because it (transitively) brings too much bagage with itself, most notably polyfills.
// This made it super-hard to add other polyfills before Aurelia's and led to various bugs.
//
// We don't add custom code in aurelia-pal or aurelia-loader or aurelia-bootstrapper to detect
// the Webpack environment and configure the loader because they might live in a DLL.
// If they do, they would bring aurelia-loader-webpack along in the DLL and this is a special 
// library that *has to be in the main chunk.*
//
// The over-complicated design I've settled upon in the end is to use this special module
// as an entry point that configures aurelia-loader-webpack. It has minimal static imports:
// just aurelia-pal, which itself has no other dependencies and doesn't run much code.
// It hacks the loader field into a getter so that it can synchronously load aurelia-loader-webpack
// just in time when it is demanded by aurelia-bootstrapper.
// This enables users to load polyfills before aurelia-loader-webpack is actually loaded.



var Loader;

Object.defineProperty(aurelia_pal__WEBPACK_IMPORTED_MODULE_0__["PLATFORM"], "Loader", {
  get: function() {
    return Loader || (Loader = __webpack_require__("./node_modules/aurelia-loader-webpack/dist/native-modules/aurelia-loader-webpack.js").WebpackLoader);
  },
  set: function(value) {
    Loader = value;
  }
});


/***/ })

}]);
//# sourceMappingURL=npm.aurelia-webpack-plugin.99bd9f227990c7d3fc39.js.map