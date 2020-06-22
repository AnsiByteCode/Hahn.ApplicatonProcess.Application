(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.isomorphic-fetch"],{

/***/ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js":
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__("./node_modules/whatwg-fetch/fetch.js");
module.exports = self.fetch.bind(self);


/***/ })

}]);
//# sourceMappingURL=npm.isomorphic-fetch.2a1d973f6869c7692749.js.map