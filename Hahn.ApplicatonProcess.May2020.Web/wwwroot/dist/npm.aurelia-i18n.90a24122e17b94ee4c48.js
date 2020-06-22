(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.aurelia-i18n"],{

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/BackendConnector.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/utils.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/logger.js");
/* harmony import */ var _EventEmitter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/EventEmitter.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }





function remove(arr, what) {
  var found = arr.indexOf(what);

  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}

var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(backend, store, services) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Connector);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.backend = backend;
    _this.store = store;
    _this.languageUtils = services.languageUtils;
    _this.options = options;
    _this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_1__["default"].create('backendConnector');

    _this.state = {};
    _this.queue = [];

    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options.backend, options);
    }
    return _this;
  }

  Connector.prototype.queueLoad = function queueLoad(languages, namespaces, options, callback) {
    var _this2 = this;

    // find what needs to be loaded
    var toLoad = [];
    var pending = [];
    var toLoadLanguages = [];
    var toLoadNamespaces = [];

    languages.forEach(function (lng) {
      var hasAllNamespaces = true;

      namespaces.forEach(function (ns) {
        var name = lng + '|' + ns;

        if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
          _this2.state[name] = 2; // loaded
        } else if (_this2.state[name] < 0) {
          // nothing to do for err
        } else if (_this2.state[name] === 1) {
          if (pending.indexOf(name) < 0) pending.push(name);
        } else {
          _this2.state[name] = 1; // pending

          hasAllNamespaces = false;

          if (pending.indexOf(name) < 0) pending.push(name);
          if (toLoad.indexOf(name) < 0) toLoad.push(name);
          if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
        }
      });

      if (!hasAllNamespaces) toLoadLanguages.push(lng);
    });

    if (toLoad.length || pending.length) {
      this.queue.push({
        pending: pending,
        loaded: {},
        errors: [],
        callback: callback
      });
    }

    return {
      toLoad: toLoad,
      pending: pending,
      toLoadLanguages: toLoadLanguages,
      toLoadNamespaces: toLoadNamespaces
    };
  };

  Connector.prototype.loaded = function loaded(name, err, data) {
    var _name$split = name.split('|'),
        _name$split2 = _slicedToArray(_name$split, 2),
        lng = _name$split2[0],
        ns = _name$split2[1];

    if (err) this.emit('failedLoading', lng, ns, err);

    if (data) {
      this.store.addResourceBundle(lng, ns, data);
    }

    // set loaded
    this.state[name] = err ? -1 : 2;

    // consolidated loading done in this run - only emit once for a loaded namespace
    var loaded = {};

    // callback if ready
    this.queue.forEach(function (q) {
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["pushPath"](q.loaded, [lng], ns);
      remove(q.pending, name);

      if (err) q.errors.push(err);

      if (q.pending.length === 0 && !q.done) {
        // only do once per loaded -> this.emit('loaded', q.loaded);
        Object.keys(q.loaded).forEach(function (l) {
          if (!loaded[l]) loaded[l] = [];
          if (q.loaded[l].length) {
            q.loaded[l].forEach(function (ns) {
              if (loaded[l].indexOf(ns) < 0) loaded[l].push(ns);
            });
          }
        });

        /* eslint no-param-reassign: 0 */
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });

    // emit consolidated loaded event
    this.emit('loaded', loaded);

    // remove done load requests
    this.queue = this.queue.filter(function (q) {
      return !q.done;
    });
  };

  Connector.prototype.read = function read(lng, ns, fcName) {
    var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var _this3 = this;

    var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 250;
    var callback = arguments[5];

    if (!lng.length) return callback(null, {}); // noting to load

    return this.backend[fcName](lng, ns, function (err, data) {
      if (err && data /* = retryFlag */ && tried < 5) {
        setTimeout(function () {
          _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    });
  };

  /* eslint consistent-return: 0 */


  Connector.prototype.prepareLoading = function prepareLoading(languages, namespaces) {
    var _this4 = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var callback = arguments[3];

    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }

    if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];

    var toLoad = this.queueLoad(languages, namespaces, options, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback(); // nothing to load and no pendings...callback now
      return null; // pendings will trigger callback
    }

    toLoad.toLoad.forEach(function (name) {
      _this4.loadOne(name);
    });
  };

  Connector.prototype.load = function load(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {}, callback);
  };

  Connector.prototype.reload = function reload(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, { reload: true }, callback);
  };

  Connector.prototype.loadOne = function loadOne(name) {
    var _this5 = this;

    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var _name$split3 = name.split('|'),
        _name$split4 = _slicedToArray(_name$split3, 2),
        lng = _name$split4[0],
        ns = _name$split4[1];

    this.read(lng, ns, 'read', null, null, function (err, data) {
      if (err) _this5.logger.warn(prefix + 'loading namespace ' + ns + ' for language ' + lng + ' failed', err);
      if (!err && data) _this5.logger.log(prefix + 'loaded namespace ' + ns + ' for language ' + lng, data);

      _this5.loaded(name, err, data);
    });
  };

  Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    if (this.backend && this.backend.create) {
      this.backend.create(languages, namespace, key, fallbackValue, null /* unused callback */, _extends({}, options, {
        isUpdate: isUpdate
      }));
    }

    // write to store to avoid resending
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  };

  return Connector;
}(_EventEmitter_js__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Connector);

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/EventEmitter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.observers = {};
  }

  EventEmitter.prototype.on = function on(events, listener) {
    var _this = this;

    events.split(' ').forEach(function (event) {
      _this.observers[event] = _this.observers[event] || [];
      _this.observers[event].push(listener);
    });
    return this;
  };

  EventEmitter.prototype.off = function off(event, listener) {
    var _this2 = this;

    if (!this.observers[event]) {
      return;
    }

    this.observers[event].forEach(function () {
      if (!listener) {
        delete _this2.observers[event];
      } else {
        var index = _this2.observers[event].indexOf(listener);
        if (index > -1) {
          _this2.observers[event].splice(index, 1);
        }
      }
    });
  };

  EventEmitter.prototype.emit = function emit(event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (this.observers[event]) {
      var cloned = [].concat(this.observers[event]);
      cloned.forEach(function (observer) {
        observer.apply(undefined, args);
      });
    }

    if (this.observers['*']) {
      var _cloned = [].concat(this.observers['*']);
      _cloned.forEach(function (observer) {
        observer.apply(observer, [event].concat(args));
      });
    }
  };

  return EventEmitter;
}();

/* harmony default export */ __webpack_exports__["default"] = (EventEmitter);

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/Interpolator.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/utils.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/logger.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Interpolator);

    this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_1__["default"].create('interpolator');

    this.init(options, true);
  }

  /* eslint no-param-reassign: 0 */


  Interpolator.prototype.init = function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var reset = arguments[1];

    if (reset) {
      this.options = options;
      this.format = options.interpolation && options.interpolation.format || function (value) {
        return value;
      };
    }
    if (!options.interpolation) options.interpolation = { escapeValue: true };

    var iOpts = options.interpolation;

    this.escape = iOpts.escape !== undefined ? iOpts.escape : _utils_js__WEBPACK_IMPORTED_MODULE_0__["escape"];
    this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
    this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;

    this.prefix = iOpts.prefix ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["regexEscape"](iOpts.prefix) : iOpts.prefixEscaped || '{{';
    this.suffix = iOpts.suffix ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["regexEscape"](iOpts.suffix) : iOpts.suffixEscaped || '}}';

    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';

    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';

    this.nestingPrefix = iOpts.nestingPrefix ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["regexEscape"](iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || _utils_js__WEBPACK_IMPORTED_MODULE_0__["regexEscape"]('$t(');
    this.nestingSuffix = iOpts.nestingSuffix ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["regexEscape"](iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || _utils_js__WEBPACK_IMPORTED_MODULE_0__["regexEscape"](')');

    this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;

    // the regexp
    this.resetRegExp();
  };

  Interpolator.prototype.reset = function reset() {
    if (this.options) this.init(this.options);
  };

  Interpolator.prototype.resetRegExp = function resetRegExp() {
    // the regexp
    var regexpStr = this.prefix + '(.+?)' + this.suffix;
    this.regexp = new RegExp(regexpStr, 'g');

    var regexpUnescapeStr = '' + this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');

    var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
  };

  Interpolator.prototype.interpolate = function interpolate(str, data, lng, options) {
    var _this = this;

    var match = void 0;
    var value = void 0;
    var replaces = void 0;

    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }

    var handleFormat = function handleFormat(key) {
      if (key.indexOf(_this.formatSeparator) < 0) return _utils_js__WEBPACK_IMPORTED_MODULE_0__["getPath"](data, key);

      var p = key.split(_this.formatSeparator);
      var k = p.shift().trim();
      var f = p.join(_this.formatSeparator).trim();

      return _this.format(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getPath"](data, k), f, lng);
    };

    this.resetRegExp();

    var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;

    replaces = 0;
    // unescape if has unescapePrefix/Suffix
    /* eslint no-cond-assign: 0 */
    while (match = this.regexpUnescape.exec(str)) {
      value = handleFormat(match[1].trim());
      str = str.replace(match[0], value);
      this.regexpUnescape.lastIndex = 0;
      replaces++;
      if (replaces >= this.maxReplaces) {
        break;
      }
    }

    replaces = 0;
    // regular escape on demand
    while (match = this.regexp.exec(str)) {
      value = handleFormat(match[1].trim());
      if (value === undefined) {
        if (typeof missingInterpolationHandler === 'function') {
          var temp = missingInterpolationHandler(str, match, options);
          value = typeof temp === 'string' ? temp : '';
        } else {
          this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
          value = '';
        }
      } else if (typeof value !== 'string' && !this.useRawValueToEscape) {
        value = _utils_js__WEBPACK_IMPORTED_MODULE_0__["makeString"](value);
      }
      value = this.escapeValue ? regexSafe(this.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
      replaces++;
      if (replaces >= this.maxReplaces) {
        break;
      }
    }
    return str;
  };

  Interpolator.prototype.nest = function nest(str, fc) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var match = void 0;
    var value = void 0;

    var clonedOptions = _extends({}, options);
    clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup

    // if value is something like "myKey": "lorem $(anotherKey, { "count": {{aValueInOptions}} })"
    function handleHasOptions(key, inheritedOptions) {
      if (key.indexOf(',') < 0) return key;

      var p = key.split(',');
      key = p.shift();
      var optionsString = p.join(',');
      optionsString = this.interpolate(optionsString, clonedOptions);
      optionsString = optionsString.replace(/'/g, '"');

      try {
        clonedOptions = JSON.parse(optionsString);

        if (inheritedOptions) clonedOptions = _extends({}, inheritedOptions, clonedOptions);
      } catch (e) {
        this.logger.error('failed parsing options string in nesting for key ' + key, e);
      }

      return key;
    }

    // regular escape on demand
    while (match = this.nestingRegexp.exec(str)) {
      value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);

      // is only the nesting key (key1 = '$(key2)') return the value without stringify
      if (value && match[0] === str && typeof value !== 'string') return value;

      // no string to include or empty
      if (typeof value !== 'string') value = _utils_js__WEBPACK_IMPORTED_MODULE_0__["makeString"](value);
      if (!value) {
        this.logger.warn('missed to resolve ' + match[1] + ' for nesting ' + str);
        value = '';
      }
      // Nested keys should not be escaped by default #854
      // value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  };

  return Interpolator;
}();

/* harmony default export */ __webpack_exports__["default"] = (Interpolator);

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/LanguageUtils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/logger.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var LanguageUtil = function () {
  function LanguageUtil(options) {
    _classCallCheck(this, LanguageUtil);

    this.options = options;

    this.whitelist = this.options.whitelist || false;
    this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"].create('languageUtils');
  }

  LanguageUtil.prototype.getScriptPartFromCode = function getScriptPartFromCode(code) {
    if (!code || code.indexOf('-') < 0) return null;

    var p = code.split('-');
    if (p.length === 2) return null;
    p.pop();
    return this.formatLanguageCode(p.join('-'));
  };

  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
    if (!code || code.indexOf('-') < 0) return code;

    var p = code.split('-');
    return this.formatLanguageCode(p[0]);
  };

  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
    // http://www.iana.org/assignments/language-tags/language-tags.xhtml
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      var p = code.split('-');

      if (this.options.lowerCaseLng) {
        p = p.map(function (part) {
          return part.toLowerCase();
        });
      } else if (p.length === 2) {
        p[0] = p[0].toLowerCase();
        p[1] = p[1].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
      } else if (p.length === 3) {
        p[0] = p[0].toLowerCase();

        // if lenght 2 guess it's a country
        if (p[1].length === 2) p[1] = p[1].toUpperCase();
        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
      }

      return p.join('-');
    }

    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  };

  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code) {
    if (this.options.load === 'languageOnly' || this.options.nonExplicitWhitelist) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1;
  };

  LanguageUtil.prototype.getFallbackCodes = function getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === 'string') fallbacks = [fallbacks];
    if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;

    if (!code) return fallbacks.default || [];

    // asume we have an object defining fallbacks
    var found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks.default;

    return found || [];
  };

  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
    var _this = this;

    var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);

    var codes = [];
    var addCode = function addCode(c) {
      if (!c) return;
      if (_this.isWhitelisted(c)) {
        codes.push(c);
      } else {
        _this.logger.warn('rejecting non-whitelisted language code: ' + c);
      }
    };

    if (typeof code === 'string' && code.indexOf('-') > -1) {
      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
    } else if (typeof code === 'string') {
      addCode(this.formatLanguageCode(code));
    }

    fallbackCodes.forEach(function (fc) {
      if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
    });

    return codes;
  };

  return LanguageUtil;
}();

/* harmony default export */ __webpack_exports__["default"] = (LanguageUtil);

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/PluralResolver.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/logger.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



// definition http://translate.sourceforge.net/wiki/l10n/pluralforms
/* eslint-disable */
var sets = [{ lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'ti', 'tr', 'uz', 'wa'], nr: [1, 2], fc: 1 }, { lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'], nr: [1, 2], fc: 2 }, { lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'], nr: [1], fc: 3 }, { lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 }, { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 }, { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 }, { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ['fr'], nr: [1, 2], fc: 9 }, { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ['is'], nr: [1, 2], fc: 12 }, { lngs: ['jv'], nr: [0, 1], fc: 13 }, { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ['lt'], nr: [1, 2, 10], fc: 15 }, { lngs: ['lv'], nr: [1, 2, 0], fc: 16 }, { lngs: ['mk'], nr: [1, 2], fc: 17 }, { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 }, { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ['or'], nr: [2, 1], fc: 2 }, { lngs: ['ro'], nr: [1, 2, 20], fc: 20 }, { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 }, { lngs: ['he'], nr: [1, 2, 20, 21], fc: 22 }];

var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  },
  22: function _(n) {
    return Number(n === 1 ? 0 : n === 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
  }
};
/* eslint-enable */

function createRules() {
  var rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}

var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PluralResolver);

    this.languageUtils = languageUtils;
    this.options = options;

    this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"].create('pluralResolver');

    this.rules = createRules();
  }

  PluralResolver.prototype.addRule = function addRule(lng, obj) {
    this.rules[lng] = obj;
  };

  PluralResolver.prototype.getRule = function getRule(code) {
    return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
  };

  PluralResolver.prototype.needsPlural = function needsPlural(code) {
    var rule = this.getRule(code);

    return rule && rule.numbers.length > 1;
  };

  PluralResolver.prototype.getPluralFormsOfKey = function getPluralFormsOfKey(code, key) {
    var _this = this;

    var ret = [];

    var rule = this.getRule(code);

    if (!rule) return ret;

    rule.numbers.forEach(function (n) {
      var suffix = _this.getSuffix(code, n);
      ret.push('' + key + suffix);
    });

    return ret;
  };

  PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
    var _this2 = this;

    var rule = this.getRule(code);

    if (rule) {
      // if (rule.numbers.length === 1) return ''; // only singular

      var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
      var suffix = rule.numbers[idx];

      // special treatment for lngs only having singular and plural
      if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        if (suffix === 2) {
          suffix = 'plural';
        } else if (suffix === 1) {
          suffix = '';
        }
      }

      var returnSuffix = function returnSuffix() {
        return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
      };

      // COMPATIBILITY JSON
      // v1
      if (this.options.compatibilityJSON === 'v1') {
        if (suffix === 1) return '';
        if (typeof suffix === 'number') return '_plural_' + suffix.toString();
        return returnSuffix();
      } else if ( /* v2 */this.options.compatibilityJSON === 'v2') {
        return returnSuffix();
      } else if ( /* v3 - gettext index */this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        return returnSuffix();
      }
      return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
    }

    this.logger.warn('no plural rule found for: ' + code);
    return '';
  };

  return PluralResolver;
}();

/* harmony default export */ __webpack_exports__["default"] = (PluralResolver);

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/ResourceStore.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventEmitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/EventEmitter.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/utils.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }




var ResourceStore = function (_EventEmitter) {
  _inherits(ResourceStore, _EventEmitter);

  function ResourceStore(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ns: ['translation'], defaultNS: 'translation' };

    _classCallCheck(this, ResourceStore);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.data = data || {};
    _this.options = options;
    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }
    return _this;
  }

  ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  };

  ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
    var index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  };

  ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;

    var path = [lng, ns];
    if (key && typeof key !== 'string') path = path.concat(key);
    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    }

    return _utils_js__WEBPACK_IMPORTED_MODULE_1__["getPath"](this.data, path);
  };

  ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : { silent: false };

    var keySeparator = this.options.keySeparator;
    if (keySeparator === undefined) keySeparator = '.';

    var path = [lng, ns];
    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    _utils_js__WEBPACK_IMPORTED_MODULE_1__["setPath"](this.data, path, value);

    if (!options.silent) this.emit('added', lng, ns, key, value);
  };

  ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { silent: false };

    /* eslint no-restricted-syntax: 0 */
    for (var m in resources) {
      if (typeof resources[m] === 'string') this.addResource(lng, ns, m, resources[m], { silent: true });
    }
    if (!options.silent) this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : { silent: false };

    var path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    var pack = _utils_js__WEBPACK_IMPORTED_MODULE_1__["getPath"](this.data, path) || {};

    if (deep) {
      _utils_js__WEBPACK_IMPORTED_MODULE_1__["deepExtend"](pack, resources, overwrite);
    } else {
      pack = _extends({}, pack, resources);
    }

    _utils_js__WEBPACK_IMPORTED_MODULE_1__["setPath"](this.data, path, pack);

    if (!options.silent) this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);

    this.emit('removed', lng, ns);
  };

  ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  };

  ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;

    // COMPATIBILITY: remove extend in v2.1.0
    if (this.options.compatibilityAPI === 'v1') return _extends({}, this.getResource(lng, ns));

    return this.getResource(lng, ns);
  };

  ResourceStore.prototype.getDataByLanguage = function getDataByLanguage(lng) {
    return this.data[lng];
  };

  ResourceStore.prototype.toJSON = function toJSON() {
    return this.data;
  };

  return ResourceStore;
}(_EventEmitter_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ResourceStore);

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/Translator.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/logger.js");
/* harmony import */ var _EventEmitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/EventEmitter.js");
/* harmony import */ var _postProcessor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/postProcessor.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/utils.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Translator = function (_EventEmitter) {
  _inherits(Translator, _EventEmitter);

  function Translator(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Translator);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _utils_js__WEBPACK_IMPORTED_MODULE_3__["copy"](['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat'], services, _this);

    _this.options = options;
    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }

    _this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"].create('translator');
    return _this;
  }

  Translator.prototype.changeLanguage = function changeLanguage(lng) {
    if (lng) this.language = lng;
  };

  Translator.prototype.exists = function exists(key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { interpolation: {} };

    var resolved = this.resolve(key, options);
    return resolved && resolved.res !== undefined;
  };

  Translator.prototype.extractFromKey = function extractFromKey(key, options) {
    var nsSeparator = options.nsSeparator || this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';

    var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;

    var namespaces = options.ns || this.options.defaultNS;
    if (nsSeparator && key.indexOf(nsSeparator) > -1) {
      var parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    if (typeof namespaces === 'string') namespaces = [namespaces];

    return {
      key: key,
      namespaces: namespaces
    };
  };

  Translator.prototype.translate = function translate(keys, options) {
    var _this2 = this;

    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' && this.options.overloadTranslationOptionHandler) {
      /* eslint prefer-rest-params: 0 */
      options = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (!options) options = {};

    // non valid keys handling
    if (keys === undefined || keys === null) return '';
    if (!Array.isArray(keys)) keys = [String(keys)];

    // separators
    var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;

    // get namespace(s)

    var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
        key = _extractFromKey.key,
        namespaces = _extractFromKey.namespaces;

    var namespace = namespaces[namespaces.length - 1];

    // return key on CIMode
    var lng = options.lng || this.language;
    var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng && lng.toLowerCase() === 'cimode') {
      if (appendNamespaceToCIMode) {
        var nsSeparator = options.nsSeparator || this.options.nsSeparator;
        return namespace + nsSeparator + key;
      }

      return key;
    }

    // resolve from store
    var resolved = this.resolve(keys, options);
    var res = resolved && resolved.res;
    var resUsedKey = resolved && resolved.usedKey || key;
    var resExactUsedKey = resolved && resolved.exactUsedKey || key;

    var resType = Object.prototype.toString.apply(res);
    var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;

    // object
    var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
    var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';
    if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
      if (!options.returnObjects && !this.options.returnObjects) {
        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
      }

      // if we got a separator we loop over children - else we just return object as is
      // as having it set to false means no hierarchy so no lookup for nested values
      if (keySeparator) {
        var resTypeIsArray = resType === '[object Array]';
        var copy = resTypeIsArray ? [] : {}; // apply child translation on a copy

        /* eslint no-restricted-syntax: 0 */
        var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
        for (var m in res) {
          if (Object.prototype.hasOwnProperty.call(res, m)) {
            var deepKey = '' + newKeyToUse + keySeparator + m;
            copy[m] = this.translate(deepKey, _extends({}, options, { joinArrays: false, ns: namespaces }));
            if (copy[m] === deepKey) copy[m] = res[m]; // if nothing found use orginal value as fallback
          }
        }
        res = copy;
      }
    } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
      // array special treatment
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, keys, options);
    } else {
      // string, empty or null
      var usedDefault = false;
      var usedKey = false;

      // fallback value
      if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
        usedDefault = true;

        if (options.count !== undefined) {
          var suffix = this.pluralResolver.getSuffix(lng, options.count);
          res = options['defaultValue' + suffix];
        }
        if (!res) res = options.defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }

      // save missing
      var updateMissing = options.defaultValue && options.defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? options.defaultValue : res);

        var lngs = [];
        var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
        if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
          for (var i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === 'all') {
          lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
        } else {
          lngs.push(options.lng || this.language);
        }

        var send = function send(l, k) {
          if (_this2.options.missingKeyHandler) {
            _this2.options.missingKeyHandler(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
          } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
            _this2.backendConnector.saveMissing(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
          }
          _this2.emit('missingKey', l, namespace, k, res);
        };

        if (this.options.saveMissing) {
          var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
          if (this.options.saveMissingPlurals && needsPluralHandling) {
            lngs.forEach(function (l) {
              var plurals = _this2.pluralResolver.getPluralFormsOfKey(l, key);

              plurals.forEach(function (p) {
                return send([l], p);
              });
            });
          } else {
            send(lngs, key);
          }
        }
      }

      // extend
      res = this.extendTranslation(res, keys, options, resolved);

      // append namespace if still key
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = namespace + ':' + key;

      // parseMissingKeyHandler
      if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
    }

    // return
    return res;
  };

  Translator.prototype.extendTranslation = function extendTranslation(res, key, options, resolved) {
    var _this3 = this;

    if (this.i18nFormat && this.i18nFormat.parse) {
      res = this.i18nFormat.parse(res, options, resolved.usedLng, resolved.usedNS, resolved.usedKey, { resolved: resolved });
    } else if (!options.skipInterpolation) {
      // i18next.parsing
      if (options.interpolation) this.interpolator.init(_extends({}, options, { interpolation: _extends({}, this.options.interpolation, options.interpolation) }));

      // interpolate
      var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
      if (this.options.interpolation.defaultVariables) data = _extends({}, this.options.interpolation.defaultVariables, data);
      res = this.interpolator.interpolate(res, data, options.lng || this.language, options);

      // nesting
      if (options.nest !== false) res = this.interpolator.nest(res, function () {
        return _this3.translate.apply(_this3, arguments);
      }, options);

      if (options.interpolation) this.interpolator.reset();
    }

    // post process
    var postProcess = options.postProcess || this.options.postProcess;
    var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

    if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
      res = _postProcessor_js__WEBPACK_IMPORTED_MODULE_2__["default"].handle(postProcessorNames, res, key, options, this);
    }

    return res;
  };

  Translator.prototype.resolve = function resolve(keys) {
    var _this4 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var found = void 0;
    var usedKey = void 0; // plain key
    var exactUsedKey = void 0; // key with context / plural
    var usedLng = void 0;
    var usedNS = void 0;

    if (typeof keys === 'string') keys = [keys];

    // forEach possible key
    keys.forEach(function (k) {
      if (_this4.isValidLookup(found)) return;
      var extracted = _this4.extractFromKey(k, options);
      var key = extracted.key;
      usedKey = key;
      var namespaces = extracted.namespaces;
      if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);

      var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';

      var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);

      namespaces.forEach(function (ns) {
        if (_this4.isValidLookup(found)) return;
        usedNS = ns;

        codes.forEach(function (code) {
          if (_this4.isValidLookup(found)) return;
          usedLng = code;

          var finalKey = key;
          var finalKeys = [finalKey];

          if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
            _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
          } else {
            var pluralSuffix = void 0;
            if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count);

            // fallback for plural if context not found
            if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);

            // get key for context if needed
            if (needsContextHandling) finalKeys.push(finalKey += '' + _this4.options.contextSeparator + options.context);

            // get key for plural if needed
            if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);
          }

          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
          var possibleKey = void 0;
          /* eslint no-cond-assign: 0 */
          while (possibleKey = finalKeys.pop()) {
            if (!_this4.isValidLookup(found)) {
              exactUsedKey = possibleKey;
              found = _this4.getResource(code, ns, possibleKey, options);
            }
          }
        });
      });
    });

    return { res: found, usedKey: usedKey, exactUsedKey: exactUsedKey, usedLng: usedLng, usedNS: usedNS };
  };

  Translator.prototype.isValidLookup = function isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  };

  Translator.prototype.getResource = function getResource(code, ns, key) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
    return this.resourceStore.getResource(code, ns, key, options);
  };

  return Translator;
}(_EventEmitter_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Translator);

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/defaults.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformOptions", function() { return transformOptions; });


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function get() {
  return {
    debug: false,
    initImmediate: true,

    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false, // string or array of namespaces

    whitelist: false, // array with whitelisted languages
    nonExplicitWhitelist: false,
    load: 'all', // | currentOnly | languageOnly
    preload: false, // array with preload languages

    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',

    partialBundledLanguages: false, // allow bundling certain languages that are not remotely fetched
    saveMissing: false, // enable to send missing values
    updateMissing: false, // enable to update default values if different from translated value (only useful on initial development, or when keeping code as source of truth)
    saveMissingTo: 'fallback', // 'current' || 'all'
    saveMissingPlurals: true, // will save all forms not only singular key
    missingKeyHandler: false, // function(lng, ns, key, fallbackValue) -> override if prefer on handling
    missingInterpolationHandler: false, // function(str, match)

    postProcess: false, // string or array of postProcessor names
    returnNull: true, // allows null value as valid translation
    returnEmptyString: true, // allows empty string value as valid translation
    returnObjects: false,
    joinArrays: false, // or string to join array
    returnedObjectHandler: function returnedObjectHandler() {}, // function(key, value, options) triggered if key returns object but returnObjects is set to false
    parseMissingKeyHandler: false, // function(key) parsed a key that was not found in t() before returning
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      var ret = {};
      if (_typeof(args[1]) === 'object') ret = args[1];
      if (typeof args[1] === 'string') ret.defaultValue = args[1];
      if (typeof args[2] === 'string') ret.tDescription = args[2];
      if (_typeof(args[2]) === 'object' || _typeof(args[3]) === 'object') {
        var options = args[3] || args[2];
        Object.keys(options).forEach(function (key) {
          ret[key] = options[key];
        });
      }
      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng) {
        return value;
      },
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      // prefixEscaped: '{{',
      // suffixEscaped: '}}',
      // unescapeSuffix: '',
      unescapePrefix: '-',

      nestingPrefix: '$t(',
      nestingSuffix: ')',
      // nestingPrefixEscaped: '$t(',
      // nestingSuffixEscaped: ')',
      // defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data
      maxReplaces: 1000 // max replaces to prevent endless loop
    }
  };
}

/* eslint no-param-reassign: 0 */
function transformOptions(options) {
  // create namespace object if namespace is passed in as string
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

  // extend whitelist with cimode
  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) {
    options.whitelist = options.whitelist.concat(['cimode']);
  }

  return options;
}

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/i18next.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/logger.js");
/* harmony import */ var _EventEmitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/EventEmitter.js");
/* harmony import */ var _ResourceStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/ResourceStore.js");
/* harmony import */ var _Translator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/Translator.js");
/* harmony import */ var _LanguageUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/LanguageUtils.js");
/* harmony import */ var _PluralResolver_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/PluralResolver.js");
/* harmony import */ var _Interpolator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/Interpolator.js");
/* harmony import */ var _BackendConnector_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/BackendConnector.js");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/defaults.js");
/* harmony import */ var _postProcessor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/postProcessor.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/utils.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }













function noop() {}

var I18n = function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  function I18n() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    _classCallCheck(this, I18n);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.options = Object(_defaults_js__WEBPACK_IMPORTED_MODULE_8__["transformOptions"])(options);
    _this.services = {};
    _this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"];
    _this.modules = { external: [] };

    if (callback && !_this.isInitialized && !options.isClone) {
      // https://github.com/i18next/i18next/issues/879
      if (!_this.options.initImmediate) {
        var _ret;

        _this.init(options, callback);
        return _ret = _this, _possibleConstructorReturn(_this, _ret);
      }
      setTimeout(function () {
        _this.init(options, callback);
      }, 0);
    }
    return _this;
  }

  I18n.prototype.init = function init() {
    var _this2 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    this.options = _extends({}, Object(_defaults_js__WEBPACK_IMPORTED_MODULE_8__["get"])(), this.options, Object(_defaults_js__WEBPACK_IMPORTED_MODULE_8__["transformOptions"])(options));

    this.format = this.options.interpolation.format;
    if (!callback) callback = noop;

    function createClassOnDemand(ClassOrObject) {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === 'function') return new ClassOrObject();
      return ClassOrObject;
    }

    // init services
    if (!this.options.isClone) {
      if (this.modules.logger) {
        _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"].init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"].init(null, this.options);
      }

      var lu = new _LanguageUtils_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.options);
      this.store = new _ResourceStore_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.options.resources, this.options);

      var s = this.services;
      s.logger = _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"];
      s.resourceStore = this.store;
      s.languageUtils = lu;
      s.pluralResolver = new _PluralResolver_js__WEBPACK_IMPORTED_MODULE_5__["default"](lu, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      });
      s.interpolator = new _Interpolator_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.options);

      s.backendConnector = new _BackendConnector_js__WEBPACK_IMPORTED_MODULE_7__["default"](createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.backendConnector.on('*', function (event) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        s.languageDetector.init(s, this.options.detection, this.options);
      }

      if (this.modules.i18nFormat) {
        s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
        if (s.i18nFormat.init) s.i18nFormat.init(this);
      }

      this.translator = new _Translator_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.services, this.options);
      // pipe events from translator
      this.translator.on('*', function (event) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      this.modules.external.forEach(function (m) {
        if (m.init) m.init(_this2);
      });
    }

    // append api
    var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
    storeApi.forEach(function (fcName) {
      _this2[fcName] = function () {
        var _store;

        return (_store = _this2.store)[fcName].apply(_store, arguments);
      };
    });

    var deferred = Object(_utils_js__WEBPACK_IMPORTED_MODULE_10__["defer"])();

    var load = function load() {
      _this2.changeLanguage(_this2.options.lng, function (err, t) {
        _this2.isInitialized = true;
        _this2.logger.log('initialized', _this2.options);
        _this2.emit('initialized', _this2.options);

        deferred.resolve(t); // not rejecting on err (as err is only a loading translation failed warning)
        callback(err, t);
      });
    };

    if (this.options.resources || !this.options.initImmediate) {
      load();
    } else {
      setTimeout(load, 0);
    }

    return deferred;
  };

  /* eslint consistent-return: 0 */


  I18n.prototype.loadResources = function loadResources() {
    var _this3 = this;

    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    if (!this.options.resources || this.options.partialBundledLanguages) {
      if (this.language && this.language.toLowerCase() === 'cimode') return callback(); // avoid loading resources for cimode

      var toLoad = [];

      var append = function append(lng) {
        if (!lng) return;
        var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach(function (l) {
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };

      if (!this.language) {
        // at least load fallbacks in this case
        var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach(function (l) {
          return append(l);
        });
      } else {
        append(this.language);
      }

      if (this.options.preload) {
        this.options.preload.forEach(function (l) {
          return append(l);
        });
      }

      this.services.backendConnector.load(toLoad, this.options.ns, callback);
    } else {
      callback(null);
    }
  };

  I18n.prototype.reloadResources = function reloadResources(lngs, ns, callback) {
    var deferred = Object(_utils_js__WEBPACK_IMPORTED_MODULE_10__["defer"])();
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    if (!callback) callback = noop;
    this.services.backendConnector.reload(lngs, ns, function () {
      deferred.resolve();
      callback(null);
    });
    return deferred;
  };

  I18n.prototype.use = function use(module) {
    if (module.type === 'backend') {
      this.modules.backend = module;
    }

    if (module.type === 'logger' || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }

    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }

    if (module.type === 'i18nFormat') {
      this.modules.i18nFormat = module;
    }

    if (module.type === 'postProcessor') {
      _postProcessor_js__WEBPACK_IMPORTED_MODULE_9__["default"].addPostProcessor(module);
    }

    if (module.type === '3rdParty') {
      this.modules.external.push(module);
    }

    return this;
  };

  I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
    var _this4 = this;

    var deferred = Object(_utils_js__WEBPACK_IMPORTED_MODULE_10__["defer"])();

    var done = function done(err, l) {
      _this4.translator.changeLanguage(l);

      if (l) {
        _this4.emit('languageChanged', l);
        _this4.logger.log('languageChanged', l);
      }

      deferred.resolve(function () {
        return _this4.t.apply(_this4, arguments);
      });
      if (callback) callback(err, function () {
        return _this4.t.apply(_this4, arguments);
      });
    };

    var setLng = function setLng(l) {
      if (l) {
        _this4.language = l;
        _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
        if (!_this4.translator.language) _this4.translator.changeLanguage(l);

        if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);
      }

      _this4.loadResources(function (err) {
        done(err, l);
      });
    };

    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      this.services.languageDetector.detect(setLng);
    } else {
      setLng(lng);
    }

    return deferred;
  };

  I18n.prototype.getFixedT = function getFixedT(lng, ns) {
    var _this5 = this;

    var fixedT = function fixedT(key, opts) {
      for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        rest[_key3 - 2] = arguments[_key3];
      }

      var options = _extends({}, opts);
      if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
        options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      }

      options.lng = options.lng || fixedT.lng;
      options.lngs = options.lngs || fixedT.lngs;
      options.ns = options.ns || fixedT.ns;
      return _this5.t(key, options);
    };
    if (typeof lng === 'string') {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    return fixedT;
  };

  I18n.prototype.t = function t() {
    var _translator;

    return this.translator && (_translator = this.translator).translate.apply(_translator, arguments);
  };

  I18n.prototype.exists = function exists() {
    var _translator2;

    return this.translator && (_translator2 = this.translator).exists.apply(_translator2, arguments);
  };

  I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  };

  I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
    var _this6 = this;

    var deferred = Object(_utils_js__WEBPACK_IMPORTED_MODULE_10__["defer"])();

    if (!this.options.ns) {
      callback && callback();
      return Promise.resolve();
    }
    if (typeof ns === 'string') ns = [ns];

    ns.forEach(function (n) {
      if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
    });

    this.loadResources(function (err) {
      deferred.resolve();
      if (callback) callback(err);
    });

    return deferred;
  };

  I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
    var deferred = Object(_utils_js__WEBPACK_IMPORTED_MODULE_10__["defer"])();

    if (typeof lngs === 'string') lngs = [lngs];
    var preloaded = this.options.preload || [];

    var newLngs = lngs.filter(function (lng) {
      return preloaded.indexOf(lng) < 0;
    });
    // Exit early if all given languages are already preloaded
    if (!newLngs.length) {
      if (callback) callback();
      return Promise.resolve();
    }

    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(function (err) {
      deferred.resolve();
      if (callback) callback(err);
    });

    return deferred;
  };

  I18n.prototype.dir = function dir(lng) {
    if (!lng) lng = this.languages && this.languages.length > 0 ? this.languages[0] : this.language;
    if (!lng) return 'rtl';

    var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];

    return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
  };

  /* eslint class-methods-use-this: 0 */


  I18n.prototype.createInstance = function createInstance() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    return new I18n(options, callback);
  };

  I18n.prototype.cloneInstance = function cloneInstance() {
    var _this7 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    var mergedOptions = _extends({}, this.options, options, { isClone: true });
    var clone = new I18n(mergedOptions);
    var membersToCopy = ['store', 'services', 'language'];
    membersToCopy.forEach(function (m) {
      clone[m] = _this7[m];
    });
    clone.translator = new _Translator_js__WEBPACK_IMPORTED_MODULE_3__["default"](clone.services, clone.options);
    clone.translator.on('*', function (event) {
      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      clone.emit.apply(clone, [event].concat(args));
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = clone.options; // sync options

    return clone;
  };

  return I18n;
}(_EventEmitter_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (new I18n());

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeLanguage", function() { return changeLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneInstance", function() { return cloneInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInstance", function() { return createInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dir", function() { return dir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exists", function() { return exists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFixedT", function() { return getFixedT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadLanguages", function() { return loadLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadNamespaces", function() { return loadNamespaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadResources", function() { return loadResources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultNamespace", function() { return setDefaultNamespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return t; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "use", function() { return use; });
/* harmony import */ var _i18next_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/i18next.js");


/* harmony default export */ __webpack_exports__["default"] = (_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

var changeLanguage = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].changeLanguage.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var cloneInstance = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].cloneInstance.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var createInstance = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].createInstance.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var dir = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].dir.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var exists = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].exists.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var getFixedT = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].getFixedT.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var init = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].init.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var loadLanguages = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].loadLanguages.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var loadNamespaces = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].loadNamespaces.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var loadResources = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].loadResources.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var off = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].off.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var on = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].on.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var setDefaultNamespace = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].setDefaultNamespace.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var t = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].t.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
var use = _i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"].use.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/logger.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var consoleLogger = {
  type: 'logger',

  log: function log(args) {
    this.output('log', args);
  },
  warn: function warn(args) {
    this.output('warn', args);
  },
  error: function error(args) {
    this.output('error', args);
  },
  output: function output(type, args) {
    var _console;

    /* eslint no-console: 0 */
    if (console && console[type]) (_console = console)[type].apply(_console, _toConsumableArray(args));
  }
};

var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Logger);

    this.init(concreteLogger, options);
  }

  Logger.prototype.init = function init(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  };

  Logger.prototype.setDebug = function setDebug(bool) {
    this.debug = bool;
  };

  Logger.prototype.log = function log() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.forward(args, 'log', '', true);
  };

  Logger.prototype.warn = function warn() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return this.forward(args, 'warn', '', true);
  };

  Logger.prototype.error = function error() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return this.forward(args, 'error', '');
  };

  Logger.prototype.deprecate = function deprecate() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
  };

  Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (typeof args[0] === 'string') args[0] = '' + prefix + this.prefix + ' ' + args[0];
    return this.logger[lvl](args);
  };

  Logger.prototype.create = function create(moduleName) {
    return new Logger(this.logger, _extends({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));
  };

  return Logger;
}();

/* harmony default export */ __webpack_exports__["default"] = (new Logger());

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/postProcessor.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  processors: {},

  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;

    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });

    return value;
  }
});

/***/ }),

/***/ "./node_modules/aurelia-i18n/node_modules/i18next/dist/es/utils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defer", function() { return defer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeString", function() { return makeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPath", function() { return setPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushPath", function() { return pushPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPath", function() { return getPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepExtend", function() { return deepExtend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regexEscape", function() { return regexEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
// http://lea.verou.me/2016/12/resolve-promises-externally-with-this-one-weird-trick/
function defer() {
  var res = void 0;
  var rej = void 0;

  var promise = new Promise(function (resolve, reject) {
    res = resolve;
    rej = reject;
  });

  promise.resolve = res;
  promise.reject = rej;

  return promise;
}

function makeString(object) {
  if (object == null) return '';
  /* eslint prefer-template: 0 */
  return '' + object;
}

function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }

  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }

  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};

    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    object = object[key];
  }

  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;

  obj[k] = newValue;
}

function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;

  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}

function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;

  if (!obj) return undefined;
  return obj[k];
}

function deepExtend(target, source, overwrite) {
  /* eslint no-restricted-syntax: 0 */
  for (var prop in source) {
    if (prop in target) {
      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
        if (overwrite) target[prop] = source[prop];
      } else {
        deepExtend(target[prop], source[prop], overwrite);
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}

function regexEscape(str) {
  /* eslint no-useless-escape: 0 */
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/* eslint-disable */
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
/* eslint-enable */

function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  }

  return data;
}

/***/ }),

/***/ "aurelia-i18n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configure", function() { return configure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DfValueConverter", function() { return DfValueConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DfBindingBehavior", function() { return DfBindingBehavior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NfValueConverter", function() { return NfValueConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NfBindingBehavior", function() { return NfBindingBehavior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RtValueConverter", function() { return RtValueConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RtBindingBehavior", function() { return RtBindingBehavior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TValueConverter", function() { return TValueConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TBindingBehavior", function() { return TBindingBehavior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TCustomAttribute", function() { return TCustomAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TParamsCustomAttribute", function() { return TParamsCustomAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18N_EA_SIGNAL", function() { return I18N_EA_SIGNAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18N", function() { return I18N; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelativeTime", function() { return RelativeTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Backend", function() { return Backend; });
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-i18n/node_modules/i18next/dist/es/index.js");
/* harmony import */ var aurelia_logging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/aurelia-logging/dist/native-modules/aurelia-logging.js");
/* harmony import */ var aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/aurelia-dependency-injection/dist/native-modules/aurelia-dependency-injection.js");
/* harmony import */ var aurelia_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/aurelia-templating/dist/native-modules/aurelia-templating.js");
/* harmony import */ var aurelia_metadata__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/aurelia-metadata/dist/native-modules/aurelia-metadata.js");
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/aurelia-pal/dist/native-modules/aurelia-pal.js");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("aurelia-framework");
/* harmony import */ var aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("aurelia-templating-resources");
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("aurelia-event-aggregator");
/* harmony import */ var aurelia_binding__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/aurelia-binding/dist/native-modules/aurelia-binding.js");











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

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var I18N_EA_SIGNAL = "i18n:locale:changed";
var I18N = /** @class */ (function () {
    function I18N(ea, signaler) {
        this.ea = ea;
        this.signaler = signaler;
        this.globalVars = {};
        this.i18next = i18next__WEBPACK_IMPORTED_MODULE_0__["default"];
        this.Intl = aurelia_pal__WEBPACK_IMPORTED_MODULE_5__["PLATFORM"].global.Intl;
    }
    I18N.inject = function () { return [aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_8__["EventAggregator"], aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_7__["BindingSignaler"]]; };
    I18N.prototype.setup = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultOptions;
            var _this = this;
            return __generator(this, function (_a) {
                defaultOptions = {
                    skipTranslationOnMissingKey: false,
                    compatibilityJSON: "v1",
                    lng: "en",
                    attributes: ["t", "i18n"],
                    fallbackLng: "en",
                    debug: false
                };
                this.i18nextDeferred = new Promise(function (resolve, reject) {
                    _this.i18next.init(options || defaultOptions, function (err) {
                        if (err && !Array.isArray(err)) {
                            reject(err);
                        }
                        // make sure attributes is an array in case a string was provided
                        if (_this.i18next.options.attributes instanceof String) {
                            _this.i18next.options.attributes = [_this.i18next.options.attributes];
                        }
                        resolve(_this.i18next);
                    });
                });
                return [2 /*return*/, this.i18nextDeferred];
            });
        });
    };
    I18N.prototype.i18nextReady = function () {
        return this.i18nextDeferred;
    };
    I18N.prototype.setLocale = function (locale) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var oldLocale = _this.getLocale();
            _this.i18next.changeLanguage(locale, function (err, tr) {
                if (err) {
                    reject(err);
                }
                _this.ea.publish(I18N_EA_SIGNAL, { oldValue: oldLocale, newValue: locale });
                _this.signaler.signal("aurelia-translation-signal");
                resolve(tr);
            });
        });
    };
    I18N.prototype.getLocale = function () {
        return this.i18next.language;
    };
    I18N.prototype.nf = function (options, locales) {
        return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
    };
    I18N.prototype.uf = function (numberLike, locale) {
        var nf = this.nf({}, locale || this.getLocale());
        var comparer = nf.format(10000 / 3);
        var thousandSeparator = comparer[1];
        var decimalSeparator = comparer[5];
        if (thousandSeparator === ".") {
            thousandSeparator = "\\.";
        }
        // remove all thousand seperators
        var result = numberLike.replace(new RegExp(thousandSeparator, "g"), "")
            // remove non-numeric signs except -> , .
            .replace(/[^\d.,-]/g, "")
            // replace original decimalSeparator with english one
            .replace(decimalSeparator, ".");
        // return real number
        return Number(result);
    };
    I18N.prototype.df = function (options, locales) {
        return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
    };
    I18N.prototype.tr = function (key, options) {
        var fullOptions = this.globalVars;
        if (options !== undefined) {
            fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
        }
        return this.i18next.t(key, fullOptions);
    };
    I18N.prototype.registerGlobalVariable = function (key, value) {
        this.globalVars[key] = value;
    };
    I18N.prototype.unregisterGlobalVariable = function (key) {
        delete this.globalVars[key];
    };
    /**
     * Scans an element for children that have a translation attribute and
     * updates their innerHTML with the current translation values.
     *
     * If an image is encountered the translated value will be applied to the src attribute.
     *
     * @param el    HTMLElement to search within
     */
    I18N.prototype.updateTranslations = function (el) {
        if (!el || !el.querySelectorAll) {
            return;
        }
        var i;
        var l;
        // create a selector from the specified attributes to look for
        // var selector = [].concat(this.i18next.options.attributes);
        var attributes = this.i18next.options.attributes;
        var selector = [].concat(attributes);
        for (i = 0, l = selector.length; i < l; i++) {
            selector[i] = "[" + selector[i] + "]";
        }
        selector = selector.join(",");
        // get the nodes
        var nodes = el.querySelectorAll(selector);
        for (i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];
            var keys = void 0;
            var params = void 0;
            // test every attribute and get the first one that has a value
            for (var i2 = 0, l2 = attributes.length; i2 < l2; i2++) {
                keys = node.getAttribute(attributes[i2]);
                var pname = attributes[i2] + "-params";
                if (pname && node.au && node.au[pname]) {
                    params = node.au[pname].viewModel.value;
                }
                if (keys) {
                    break;
                }
            }
            // skip if nothing was found
            if (!keys) {
                continue;
            }
            // split the keys into multiple keys separated by a ;
            this.updateValue(node, keys, params);
        }
    };
    I18N.prototype.updateValue = function (node, value, params) {
        if (value === null || value === undefined) {
            value = "";
        }
        var keys = value.toString().split(";");
        var i = keys.length;
        while (i--) {
            var key = keys[i];
            // remove the optional attribute
            var re = /\[([a-z\-, ]*)\]/ig;
            var m = void 0;
            var attr = "text";
            // set default attribute to src if this is an image node
            if (node.nodeName === "IMG") {
                attr = "src";
            }
            // check if a attribute was specified in the key
            // tslint:disable-next-line:no-conditional-assignment
            while ((m = re.exec(key)) !== null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                if (m) {
                    key = key.replace(m[0], "");
                    attr = m[1];
                }
            }
            var attrs = attr.split(",");
            var j = attrs.length;
            while (j--) {
                attr = attrs[j].trim();
                if (!node._textContent) {
                    node._textContent = node.textContent;
                }
                if (!node._innerHTML) {
                    node._innerHTML = node.innerHTML;
                }
                // convert to camelCase
                // tslint:disable-next-line:only-arrow-functions
                var attrCC = attr.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                var reservedNames = ["prepend", "append", "text", "html"];
                var i18nLogger = Object(aurelia_logging__WEBPACK_IMPORTED_MODULE_1__["getLogger"])("i18n");
                if (reservedNames.indexOf(attr) > -1 &&
                    node.au &&
                    node.au.controller &&
                    node.au.controller.viewModel &&
                    attrCC in node.au.controller.viewModel) {
                    i18nLogger.warn("Aurelia I18N reserved attribute name\n\n  [" + reservedNames.join(", ") + "]\n\n  Your custom element has a bindable named " + attr + " which is a reserved word.\n\n  If you'd like Aurelia I18N to translate your bindable instead, please consider giving it another name.");
                }
                if (this.i18next.options.skipTranslationOnMissingKey &&
                    this.tr(key, params) === key) {
                    i18nLogger.warn("Couldn't find translation for key: " + key);
                    return;
                }
                // handle various attributes
                // anything other than text,prepend,append or html will be added as an attribute on the element.
                switch (attr) {
                    case "text":
                        var newChild = aurelia_pal__WEBPACK_IMPORTED_MODULE_5__["DOM"].createTextNode(this.tr(key, params));
                        if (node._newChild && node._newChild.parentNode === node) {
                            node.removeChild(node._newChild);
                        }
                        node._newChild = newChild;
                        while (node.firstChild) {
                            node.removeChild(node.firstChild);
                        }
                        node.appendChild(node._newChild);
                        break;
                    case "prepend":
                        var prependParser = aurelia_pal__WEBPACK_IMPORTED_MODULE_5__["DOM"].createElement("div");
                        prependParser.innerHTML = this.tr(key, params);
                        for (var ni = node.childNodes.length - 1; ni >= 0; ni--) {
                            if (node.childNodes[ni]._prepended) {
                                node.removeChild(node.childNodes[ni]);
                            }
                        }
                        for (var pi = prependParser.childNodes.length - 1; pi >= 0; pi--) {
                            prependParser.childNodes[pi]._prepended = true;
                            if (node.firstChild) {
                                node.insertBefore(prependParser.childNodes[pi], node.firstChild);
                            }
                            else {
                                node.appendChild(prependParser.childNodes[pi]);
                            }
                        }
                        break;
                    case "append":
                        var appendParser = aurelia_pal__WEBPACK_IMPORTED_MODULE_5__["DOM"].createElement("div");
                        appendParser.innerHTML = this.tr(key, params);
                        for (var ni = node.childNodes.length - 1; ni >= 0; ni--) {
                            if (node.childNodes[ni]._appended) {
                                node.removeChild(node.childNodes[ni]);
                            }
                        }
                        while (appendParser.firstChild) {
                            appendParser.firstChild._appended = true;
                            node.appendChild(appendParser.firstChild);
                        }
                        break;
                    case "html":
                        node.innerHTML = this.tr(key, params);
                        break;
                    default: // normal html attribute
                        if (node.au &&
                            node.au.controller &&
                            node.au.controller.viewModel &&
                            attrCC in node.au.controller.viewModel) {
                            node.au.controller.viewModel[attrCC] = this.tr(key, params);
                        }
                        else {
                            node.setAttribute(attr, this.tr(key, params));
                        }
                        break;
                }
            }
        }
    };
    return I18N;
}());

var TBindingBehavior = /** @class */ (function () {
    function TBindingBehavior(signalBindingBehavior) {
        this.signalBindingBehavior = signalBindingBehavior;
    }
    TBindingBehavior.inject = function () { return [aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_7__["SignalBindingBehavior"]]; };
    TBindingBehavior.prototype.bind = function (binding, source) {
        // bind the signal behavior
        this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
        // rewrite the expression to use the TValueConverter.
        // pass through any args to the binding behavior to the TValueConverter
        var sourceExpression = binding.sourceExpression;
        // do create the sourceExpression only once
        if (sourceExpression.rewritten) {
            return;
        }
        sourceExpression.rewritten = true;
        var expression = sourceExpression.expression;
        sourceExpression.expression = new aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["ValueConverter"](expression, "t", sourceExpression.args, [expression].concat(sourceExpression.args));
    };
    TBindingBehavior.prototype.unbind = function (binding, source) {
        // unbind the signal behavior
        this.signalBindingBehavior.unbind(binding, source);
    };
    TBindingBehavior = __decorate([
        Object(aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["bindingBehavior"])("t")
    ], TBindingBehavior);
    return TBindingBehavior;
}());

// tslint:disable-next-line:only-arrow-functions
var isInteger = Number.isInteger || function (value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
};
var LazyOptional = /** @class */ (function () {
    function LazyOptional(key) {
        this.key = key;
    }
    LazyOptional_1 = LazyOptional;
    LazyOptional.of = function (key) {
        return new LazyOptional_1(key);
    };
    LazyOptional.prototype.get = function (container) {
        var _this = this;
        return function () {
            if (container.hasResolver(_this.key, false)) {
                return container.get(_this.key);
            }
            return null;
        };
    };
    var LazyOptional_1;
    LazyOptional = LazyOptional_1 = __decorate([
        Object(aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_2__["resolver"])()
    ], LazyOptional);
    return LazyOptional;
}());

var TParamsCustomAttribute = /** @class */ (function () {
    function TParamsCustomAttribute(element) {
        this.element = element;
    }
    TParamsCustomAttribute_1 = TParamsCustomAttribute;
    TParamsCustomAttribute.inject = function () {
        return [aurelia_pal__WEBPACK_IMPORTED_MODULE_5__["DOM"].Element];
    };
    TParamsCustomAttribute.configureAliases = function (aliases) {
        var r = aurelia_metadata__WEBPACK_IMPORTED_MODULE_4__["metadata"].getOrCreateOwn(aurelia_metadata__WEBPACK_IMPORTED_MODULE_4__["metadata"].resource, aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["HtmlBehaviorResource"], TParamsCustomAttribute_1);
        r.aliases = aliases;
    };
    TParamsCustomAttribute.prototype.valueChanged = function () { };
    var TParamsCustomAttribute_1;
    TParamsCustomAttribute = TParamsCustomAttribute_1 = __decorate([
        Object(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["customAttribute"])("t-params")
    ], TParamsCustomAttribute);
    return TParamsCustomAttribute;
}());

var TCustomAttribute = /** @class */ (function () {
    function TCustomAttribute(element, service, ea, p) {
        this.element = element;
        this.service = service;
        this.ea = ea;
        this.lazyParams = p;
    }
    TCustomAttribute_1 = TCustomAttribute;
    TCustomAttribute.inject = function () {
        return [aurelia_pal__WEBPACK_IMPORTED_MODULE_5__["DOM"].Element, I18N, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_8__["EventAggregator"], LazyOptional.of(TParamsCustomAttribute)];
    };
    TCustomAttribute.configureAliases = function (aliases) {
        var r = aurelia_metadata__WEBPACK_IMPORTED_MODULE_4__["metadata"].getOrCreateOwn(aurelia_metadata__WEBPACK_IMPORTED_MODULE_4__["metadata"].resource, aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["HtmlBehaviorResource"], TCustomAttribute_1);
        r.aliases = aliases;
    };
    TCustomAttribute.prototype.bind = function () {
        var _this = this;
        this.params = this.lazyParams();
        if (this.params) {
            this.params.valueChanged = function (newParams, oldParams) {
                _this.paramsChanged(_this.value, newParams, oldParams);
            };
        }
        var p = this.params !== null ? this.params.value : undefined;
        this.subscription = this.ea.subscribe(I18N_EA_SIGNAL, function () {
            _this.service.updateValue(_this.element, _this.value, _this.params !== null ? _this.params.value : undefined);
        });
        this.service.updateValue(this.element, this.value, p);
    };
    TCustomAttribute.prototype.paramsChanged = function (newValue, newParams) {
        this.service.updateValue(this.element, newValue, newParams);
    };
    TCustomAttribute.prototype.valueChanged = function (newValue) {
        var p = this.params !== null ? this.params.value : undefined;
        this.service.updateValue(this.element, newValue, p);
    };
    TCustomAttribute.prototype.unbind = function () {
        // If unbind is called before timeout for subscription is triggered, subscription will be undefined
        if (this.subscription) {
            this.subscription.dispose();
        }
    };
    var TCustomAttribute_1;
    TCustomAttribute = TCustomAttribute_1 = __decorate([
        Object(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["customAttribute"])("t")
    ], TCustomAttribute);
    return TCustomAttribute;
}());

var TValueConverter = /** @class */ (function () {
    function TValueConverter(service) {
        this.service = service;
    }
    TValueConverter.inject = function () { return [I18N]; };
    TValueConverter.prototype.toView = function (value, options) {
        return this.service.tr(value, options);
    };
    TValueConverter = __decorate([
        Object(aurelia_framework__WEBPACK_IMPORTED_MODULE_6__["valueConverter"])("t")
    ], TValueConverter);
    return TValueConverter;
}());

var NfBindingBehavior = /** @class */ (function () {
    function NfBindingBehavior(signalBindingBehavior) {
        this.signalBindingBehavior = signalBindingBehavior;
    }
    NfBindingBehavior.inject = function () { return [aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_7__["SignalBindingBehavior"]]; };
    NfBindingBehavior.prototype.bind = function (binding, source) {
        // bind the signal behavior
        this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
        // rewrite the expression to use the NfValueConverter.
        // pass through any args to the binding behavior to the NfValueConverter
        var sourceExpression = binding.sourceExpression;
        // do create the sourceExpression only once
        if (sourceExpression.rewritten) {
            return;
        }
        sourceExpression.rewritten = true;
        var expression = sourceExpression.expression;
        sourceExpression.expression = new aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["ValueConverter"](expression, "nf", sourceExpression.args, [expression].concat(sourceExpression.args));
    };
    NfBindingBehavior.prototype.unbind = function (binding, source) {
        // unbind the signal behavior
        this.signalBindingBehavior.unbind(binding, source);
    };
    NfBindingBehavior = __decorate([
        Object(aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["bindingBehavior"])("nf")
    ], NfBindingBehavior);
    return NfBindingBehavior;
}());

var NfValueConverter = /** @class */ (function () {
    function NfValueConverter(service) {
        this.service = service;
    }
    NfValueConverter.inject = function () { return [I18N]; };
    NfValueConverter.prototype.toView = function (value, nfOrOptions, locale) {
        if (value === null
            || typeof value === "undefined"
            || (typeof value === "string" && value.trim() === "")) {
            return value;
        }
        if (nfOrOptions && (nfOrOptions instanceof Intl.NumberFormat && typeof nfOrOptions.format === "function")) {
            return nfOrOptions.format(value);
        }
        var nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
        return nf.format(value);
    };
    NfValueConverter = __decorate([
        Object(aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["valueConverter"])("nf")
    ], NfValueConverter);
    return NfValueConverter;
}());

var DfBindingBehavior = /** @class */ (function () {
    function DfBindingBehavior(signalBindingBehavior) {
        this.signalBindingBehavior = signalBindingBehavior;
    }
    DfBindingBehavior.inject = function () { return [aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_7__["SignalBindingBehavior"]]; };
    DfBindingBehavior.prototype.bind = function (binding, source) {
        // bind the signal behavior
        this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
        // rewrite the expression to use the DfValueConverter.
        // pass through any args to the binding behavior to the DfValueConverter
        var sourceExpression = binding.sourceExpression;
        // do create the sourceExpression only once
        if (sourceExpression.rewritten) {
            return;
        }
        sourceExpression.rewritten = true;
        var expression = sourceExpression.expression;
        sourceExpression.expression = new aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["ValueConverter"](expression, "df", sourceExpression.args, [expression].concat(sourceExpression.args));
    };
    DfBindingBehavior.prototype.unbind = function (binding, source) {
        // unbind the signal behavior
        this.signalBindingBehavior.unbind(binding, source);
    };
    DfBindingBehavior = __decorate([
        Object(aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["bindingBehavior"])("df")
    ], DfBindingBehavior);
    return DfBindingBehavior;
}());

var DfValueConverter = /** @class */ (function () {
    function DfValueConverter(service) {
        this.service = service;
    }
    DfValueConverter.inject = function () { return [I18N]; };
    DfValueConverter.prototype.toView = function (value, dfOrOptions, locale) {
        if (value === null
            || typeof value === "undefined"
            || (typeof value === "string" && value.trim() === "")) {
            return value;
        }
        if (typeof value === "string" && isNaN(value) && !isInteger(value)) {
            value = new Date(value);
        }
        if (dfOrOptions && (dfOrOptions instanceof Intl.DateTimeFormat && typeof dfOrOptions.format === "function")) {
            return dfOrOptions.format(value);
        }
        var df = this.service.df(dfOrOptions, locale || this.service.getLocale());
        return df.format(value);
    };
    DfValueConverter = __decorate([
        Object(aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["valueConverter"])("df")
    ], DfValueConverter);
    return DfValueConverter;
}());

var RtBindingBehavior = /** @class */ (function () {
    function RtBindingBehavior(signalBindingBehavior) {
        this.signalBindingBehavior = signalBindingBehavior;
    }
    RtBindingBehavior.inject = function () { return [aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_7__["SignalBindingBehavior"]]; };
    RtBindingBehavior.prototype.bind = function (binding, source) {
        // bind the signal behavior
        this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal", "aurelia-relativetime-signal");
        // rewrite the expression to use the RtValueConverter.
        // pass through any args to the binding behavior to the RtValueConverter
        var sourceExpression = binding.sourceExpression;
        // do create the sourceExpression only once
        if (sourceExpression.rewritten) {
            return;
        }
        sourceExpression.rewritten = true;
        var expression = sourceExpression.expression;
        sourceExpression.expression = new aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["ValueConverter"](expression, "rt", sourceExpression.args, [expression].concat(sourceExpression.args));
    };
    RtBindingBehavior.prototype.unbind = function (binding, source) {
        // unbind the signal behavior
        this.signalBindingBehavior.unbind(binding, source);
    };
    RtBindingBehavior = __decorate([
        Object(aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["bindingBehavior"])("rt")
    ], RtBindingBehavior);
    return RtBindingBehavior;
}());

var translations = {
    ar: {
        translation: {
            now: 'الآن',
            second_ago: 'منذ __count__ ثانية',
            second_ago_plural: 'منذ __count__ ثواني',
            second_in: 'في __count__ ثانية',
            second_in_plural: 'في __count__ ثواني',
            minute_ago: 'منذ __count__ دقيقة',
            minute_ago_plural: 'منذ __count__ دقائق',
            minute_in: 'في __count__ دقيقة',
            minute_in_plural: 'في __count__ دقائق',
            hour_ago: 'منذ __count__ ساعة',
            hour_ago_plural: 'منذ __count__ ساعات',
            hour_in: 'في __count__ ساعة',
            hour_in_plural: 'في __count__ ساعات',
            day_ago: 'منذ __count__ يوم',
            day_ago_plural: 'منذ __count__ أيام',
            day_in: 'في __count__ يوم',
            day_in_plural: 'في __count__ أيام',
            month_ago: 'منذ __count__ شهر',
            month_ago_plural: 'منذ __count__ أشهر',
            month_in: 'في __count__ شهر',
            month_in_plural: 'في __count__ أشهر',
            year_ago: 'منذ __count__ سنة',
            year_ago_plural: 'منذ __count__ سنوات',
            year_in: 'في __count__ سنة',
            year_in_plural: 'في __count__ سنوات'
        }
    },
    da: {
        translation: {
            now: 'lige nu',
            second_ago: '__count__ sekund siden',
            second_ago_plural: '__count__ sekunder siden',
            second_in: 'i __count__ sekund',
            second_in_plural: 'i __count__ sekunder',
            minute_ago: '__count__ minut siden',
            minute_ago_plural: '__count__ minutter siden',
            minute_in: 'i __count__ minut',
            minute_in_plural: 'i __count__ minutter',
            hour_ago: '__count__ time siden',
            hour_ago_plural: '__count__ timer siden',
            hour_in: 'i __count__ time',
            hour_in_plural: 'i __count__ timer',
            day_ago: '__count__ dag siden',
            day_ago_plural: '__count__ dage siden',
            day_in: 'i __count__ dag',
            day_in_plural: 'i __count__ dage',
            month_ago: '__count__ måned siden',
            month_ago_plural: '__count__ måneder siden',
            month_in: 'i __count__ måned',
            month_in_plural: 'i __count__ måneder',
            year_ago: '__count__ år siden',
            year_ago_plural: '__count__ år siden',
            year_in: 'i __count__ år',
            year_in_plural: 'i __count__ år'
        }
    },
    de: {
        translation: {
            now: 'jetzt gerade',
            second_ago: 'vor __count__ Sekunde',
            second_ago_plural: 'vor __count__ Sekunden',
            second_in: 'in __count__ Sekunde',
            second_in_plural: 'in __count__ Sekunden',
            minute_ago: 'vor __count__ Minute',
            minute_ago_plural: 'vor __count__ Minuten',
            minute_in: 'in __count__ Minute',
            minute_in_plural: 'in __count__ Minuten',
            hour_ago: 'vor __count__ Stunde',
            hour_ago_plural: 'vor __count__ Stunden',
            hour_in: 'in __count__ Stunde',
            hour_in_plural: 'in __count__ Stunden',
            day_ago: 'vor __count__ Tag',
            day_ago_plural: 'vor __count__ Tagen',
            day_in: 'in __count__ Tag',
            day_in_plural: 'in __count__ Tagen',
            month_ago: 'vor __count__ Monat',
            month_ago_plural: 'vor __count__ Monaten',
            month_in: 'in __count__ Monat',
            month_in_plural: 'in __count__ Monaten',
            year_ago: 'vor __count__ Jahr',
            year_ago_plural: 'vor __count__ Jahren',
            year_in: 'in __count__ Jahr',
            year_in_plural: 'in __count__ Jahren'
        }
    },
    en: {
        translation: {
            now: 'just now',
            second_ago: '__count__ second ago',
            second_ago_plural: '__count__ seconds ago',
            second_in: 'in __count__ second',
            second_in_plural: 'in __count__ seconds',
            minute_ago: '__count__ minute ago',
            minute_ago_plural: '__count__ minutes ago',
            minute_in: 'in __count__ minute',
            minute_in_plural: 'in __count__ minutes',
            hour_ago: '__count__ hour ago',
            hour_ago_plural: '__count__ hours ago',
            hour_in: 'in __count__ hour',
            hour_in_plural: 'in __count__ hours',
            day_ago: '__count__ day ago',
            day_ago_plural: '__count__ days ago',
            day_in: 'in __count__ day',
            day_in_plural: 'in __count__ days',
            month_ago: '__count__ month ago',
            month_ago_plural: '__count__ months ago',
            month_in: 'in __count__ month',
            month_in_plural: 'in __count__ months',
            year_ago: '__count__ year ago',
            year_ago_plural: '__count__ years ago',
            year_in: 'in __count__ year',
            year_in_plural: 'in __count__ years'
        }
    },
    es: {
        translation: {
            now: 'ahora mismo',
            second_ago: 'hace __count__ segundo',
            second_ago_plural: 'hace __count__ segundos',
            second_in: 'en __count__ segundo',
            second_in_plural: 'en __count__ segundos',
            minute_ago: 'hace __count__ minuto',
            minute_ago_plural: 'hace __count__ minutos',
            minute_in: 'en __count__ minuto',
            minute_in_plural: 'en __count__ minutos',
            hour_ago: 'hace __count__ hora',
            hour_ago_plural: 'hace __count__ horas',
            hour_in: 'en __count__ hora',
            hour_in_plural: 'en __count__ horas',
            day_ago: 'hace __count__ día',
            day_ago_plural: 'hace __count__ días',
            day_in: 'en __count__ día',
            day_in_plural: 'en __count__ días',
            month_ago: 'hace __count__ mes',
            month_ago_plural: 'hace __count__ meses',
            month_in: 'en __count__ mes',
            month_in_plural: 'en __count__ meses',
            year_ago: 'hace __count__ año',
            year_ago_plural: 'hace __count__ años',
            year_in: 'en __count__ año',
            year_in_plural: 'en __count__ años'
        }
    },
    fi: {
        translation: {
            now: 'Nyt',
            second_ago: '__count__ sekuntti sitten',
            second_ago_plural: '__count__ sekunttia sitten',
            second_in: ' __count__ sekunnin kuluttua',
            second_in_plural: ' __count__ sekunttien kuluttua',
            minute_ago: '__count__ minuutti sitten',
            minute_ago_plural: '__count__ minuuttia sitten',
            minute_in: ' __count__ minuutin kuluttua',
            minute_in_plural: ' __count__ minuuttien kuluttua',
            hour_ago: '__count__ tunti sitten',
            hour_ago_plural: '__count__ tuntia sitten',
            hour_in: ' __count__ tunnin kuluttua',
            hour_in_plural: ' __count__ tunnin kuluttua',
            day_ago: '__count__ päivä sitten',
            day_ago_plural: '__count__ päiviä sitten',
            day_in: ' __count__ päivän kuluttua',
            day_in_plural: '__count__ päivien kuluttua',
            month_ago: '__count__ kuukausi sitten',
            month_ago_plural: '__count__ kuukausia sitten',
            month_in: ' __count__ kuukauden kuluttua',
            month_in_plural: ' __count__ kuukausien kuluttua',
            year_ago: '__count__ vuosi sitten',
            year_ago_plural: '__count__ vuosia sitten',
            year_in: ' __count__ vuoden kuluttua',
            year_in_plural: ' __count__ vuosien kuluttua'
        }
    },
    fr: {
        translation: {
            now: 'maintenant',
            second_ago: 'il y a __count__ seconde',
            second_ago_plural: 'il y a __count__ secondes',
            second_in: 'dans __count__ seconde',
            second_in_plural: 'dans __count__ secondes',
            minute_ago: 'il y a __count__ minute',
            minute_ago_plural: 'il y a __count__ minutes',
            minute_in: 'dans __count__ minute',
            minute_in_plural: 'dans __count__ minutes',
            hour_ago: 'il y a __count__ heure',
            hour_ago_plural: 'il y a __count__ heures',
            hour_in: 'dans __count__ heure',
            hour_in_plural: 'dans __count__ heures',
            day_ago: 'il y a __count__ jour',
            day_ago_plural: 'il y a __count__ jours',
            day_in: 'dans __count__ jour',
            day_in_plural: 'dans __count__ jours',
            month_ago: 'il y a __count__ mois',
            month_ago_plural: 'il y a __count__ mois',
            month_in: 'dans __count__ mois',
            month_in_plural: 'dans __count__ mois',
            year_ago: 'il y a __count__ an',
            year_ago_plural: 'il y a __count__ ans',
            year_in: 'dans __count__ an',
            year_in_plural: 'dans __count__ ans'
        }
    },
    it: {
        translation: {
            now: 'adesso',
            second_ago: '__count__ secondo fa',
            second_ago_plural: '__count__ secondi fa',
            second_in: 'in __count__ secondo',
            second_in_plural: 'in __count__ secondi',
            minute_ago: '__count__ minuto fa',
            minute_ago_plural: '__count__ minuti fa',
            minute_in: 'in __count__ minuto',
            minute_in_plural: 'in __count__ minuti',
            hour_ago: '__count__ ora fa',
            hour_ago_plural: '__count__ ore fa',
            hour_in: 'in __count__ ora',
            hour_in_plural: 'in __count__ ore',
            day_ago: '__count__ giorno fa',
            day_ago_plural: '__count__ giorni fa',
            day_in: 'in __count__ giorno',
            day_in_plural: 'in __count__ giorni',
            month_ago: '__count__ mese fa',
            month_ago_plural: '__count__ mesi fa',
            month_in: 'in __count__ mese',
            month_in_plural: 'in __count__ mesi',
            year_ago: '__count__ anno fa',
            year_ago_plural: '__count__ anni fa',
            year_in: 'in __count__ anno',
            year_in_plural: 'in __count__ anni'
        }
    },
    ja: {
        translation: {
            now: 'たった今',
            second_ago: '__count__ 秒前',
            second_ago_plural: '__count__ 秒前',
            second_in: 'あと __count__ 秒',
            second_in_plural: 'あと __count__ 秒',
            minute_ago: '__count__ 分前',
            minute_ago_plural: '__count__ 分前',
            minute_in: 'あと __count__ 分',
            minute_in_plural: 'あと __count__ 分',
            hour_ago: '__count__ 時間前',
            hour_ago_plural: '__count__ 時間前',
            hour_in: 'あと __count__ 時間',
            hour_in_plural: 'あと __count__ 時間',
            day_ago: '__count__ 日間前',
            day_ago_plural: '__count__ 日間前',
            day_in: 'あと __count__ 日間',
            day_in_plural: 'あと __count__ 日間',
            month_ago: '__count__ ヶ月前',
            month_ago_plural: '__count__ ヶ月前',
            month_in: 'あと __count__ ヶ月',
            month_in_plural: 'あと __count__ ヶ月',
            year_ago: '__count__ 年前',
            year_ago_plural: '__count__ 年前',
            year_in: 'あと __count__ 年',
            year_in_plural: 'あと __count__ 年'
        }
    },
    lt: {
        translation: {
            now: 'šiuo metu',
            second_ago: 'prieš __count__ sekundę',
            second_ago_plural: 'prieš __count__ sekundes',
            second_in: 'po __count__ sekundės',
            second_in_plural: 'po __count__ sekundžių',
            minute_ago: 'prieš __count__ minutę',
            minute_ago_plural: 'prieš __count__ minutes',
            minute_in: 'po __count__ minutės',
            minute_in_plural: 'po __count__ minučių',
            hour_ago: 'prieš __count__ valandą',
            hour_ago_plural: 'prieš __count__ valandas',
            hour_in: 'po __count__ valandos',
            hour_in_plural: 'po __count__ valandų',
            day_ago: 'prieš __count__ dieną',
            day_ago_plural: 'prieš __count__ dienas',
            day_in: 'po __count__ dienos',
            day_in_plural: 'po __count__ dienų',
            month_ago: 'prieš __count__ mėnesį',
            month_ago_plural: 'prieš __count__ mėnesius',
            month_in: 'po __count__ mėnesio',
            month_in_plural: 'po __count__ mėnesių',
            year_ago: 'prieš __count__ metus',
            year_ago_plural: 'prieš __count__ metus',
            year_in: 'po __count__ metų',
            year_in_plural: 'po __count__ metų'
        }
    },
    nl: {
        translation: {
            now: 'zonet',
            second_ago: '__count__ seconde geleden',
            second_ago_plural: '__count__ seconden geleden',
            second_in: 'in __count__ seconde',
            second_in_plural: 'in __count__ seconden',
            minute_ago: '__count__ minuut geleden',
            minute_ago_plural: '__count__ minuten geleden',
            minute_in: 'in __count__ minuut',
            minute_in_plural: 'in __count__ minuten',
            hour_ago: '__count__ uur geleden',
            hour_ago_plural: '__count__ uren geleden',
            hour_in: 'in __count__ uur',
            hour_in_plural: 'in __count__ uren',
            day_ago: '__count__ dag geleden',
            day_ago_plural: '__count__ dagen geleden',
            day_in: 'in __count__ dag',
            day_in_plural: 'in __count__ dagen',
            month_ago: '__count__ maand geleden',
            month_ago_plural: '__count__ maanden geleden',
            month_in: 'in __count__ maand',
            month_in_plural: 'in __count__ maanden',
            year_ago: '__count__ jaar geleden',
            year_ago_plural: '__count__ jaren geleden',
            year_in: 'in __count__ jaar',
            year_in_plural: 'in __count__ jaren'
        }
    },
    nn: {
        translation: {
            now: 'akkurat nå',
            second_ago: '__count__ sekund siden',
            second_ago_plural: '__count__ sekunder siden',
            second_in: 'om __count__ sekund',
            second_in_plural: 'om __count__ sekunder',
            minute_ago: '__count__ minutt siden',
            minute_ago_plural: '__count__ minutter siden',
            minute_in: 'om __count__ minutt',
            minute_in_plural: 'om __count__ minutter',
            hour_ago: '__count__ time siden',
            hour_ago_plural: '__count__ timer siden',
            hour_in: 'om __count__ time',
            hour_in_plural: 'om __count__ timer',
            day_ago: '__count__ dag siden',
            day_ago_plural: '__count__ dager siden',
            day_in: 'om __count__ dag',
            day_in_plural: 'om __count__ dager',
            month_ago: '__count__ en måned siden',
            month_ago_plural: '__count__ flere måneder siden',
            month_in: 'I løpet av en __count__ måned',
            month_in_plural: 'I løpet av   __count__ måneder',
            year_ago: '__count__ et år siden',
            year_ago_plural: '__count__ flere å siden',
            year_in: 'I løpet av ett år __count__ år',
            year_in_plural: 'på flere __count__ år'
        }
    },
    no: {
        translation: {
            now: 'akkurat nå',
            second_ago: '__count__ sekund siden',
            second_ago_plural: '__count__ sekunder siden',
            second_in: 'om __count__ sekund',
            second_in_plural: 'om __count__ sekunder',
            minute_ago: '__count__ minutt siden',
            minute_ago_plural: '__count__ minutter siden',
            minute_in: 'om __count__ minutt',
            minute_in_plural: 'om __count__ minutter',
            hour_ago: '__count__ time siden',
            hour_ago_plural: '__count__ timer siden',
            hour_in: 'om __count__ time',
            hour_in_plural: 'om __count__ timer',
            day_ago: '__count__ dag siden',
            day_ago_plural: '__count__ dager siden',
            day_in: 'om __count__ dag',
            day_in_plural: 'om __count__ dager',
            month_ago: '__count__ en måned siden',
            month_ago_plural: '__count__ flere måneder siden',
            month_in: 'I løpet av en __count__ måned',
            month_in_plural: 'I løpet av   __count__ måneder',
            year_ago: '__count__ et år siden',
            year_ago_plural: '__count__ flere å siden',
            year_in: 'I løpet av ett år __count__ år',
            year_in_plural: 'på flere __count__ år'
        }
    },
    pl: {
        translation: {
            now: 'teraz',
            second_ago: '__count__ s temu',
            second_ago_plural: '__count__ s temu',
            second_in: 'za __count__ s',
            second_in_plural: 'za __count__ s',
            minute_ago: '__count__ min temu',
            minute_ago_plural: '__count__ min temu',
            minute_in: 'za __count__ min',
            minute_in_plural: 'za __count__ min',
            hour_ago: '__count__ h temu',
            hour_ago_plural: '__count__ h temu',
            hour_in: 'za __count__ h',
            hour_in_plural: 'za __count__ h',
            day_ago: '__count__ dzień temu',
            day_ago_plural: '__count__ dias atrás',
            day_in: 'za __count__ dni',
            day_in_plural: 'za __count__ dni',
            month_ago: '__count__ miesiąc temu',
            month_ago_plural: '__count__ mies. temu',
            month_in: 'za __count__ miesiąc',
            month_in_plural: 'za __count__ mies.',
            year_ago: '__count__ rok temu',
            year_ago_plural: '__count__ lata/lat temu',
            year_in: 'za __count__ rok',
            year_in_plural: '__count__ lata/lat'
        }
    },
    pt: {
        translation: {
            now: 'neste exato momento',
            second_ago: '__count__ segundo atrás',
            second_ago_plural: '__count__ segundos atrás',
            second_in: 'em __count__ segundo',
            second_in_plural: 'em __count__ segundos',
            minute_ago: '__count__ minuto atrás',
            minute_ago_plural: '__count__ minutos atrás',
            minute_in: 'em __count__ minuto',
            minute_in_plural: 'em __count__ minutos',
            hour_ago: '__count__ hora atrás',
            hour_ago_plural: '__count__ horas atrás',
            hour_in: 'em __count__ hora',
            hour_in_plural: 'em __count__ horas',
            day_ago: '__count__ dia atrás',
            day_ago_plural: '__count__ dias atrás',
            day_in: 'em __count__ dia',
            day_in_plural: 'em __count__ dias',
            month_ago: '__count__ mês atrás',
            month_ago_plural: '__count__ meses atrás',
            month_in: 'em __count__ mês',
            month_in_plural: 'em __count__ meses',
            year_ago: '__count__ ano atrás',
            year_ago_plural: '__count__ anos atrás',
            year_in: 'em __count__ ano',
            year_in_plural: 'em __count__ anos'
        }
    },
    sv: {
        translation: {
            now: 'nu',
            second_ago: '__count__ sekund sedan',
            second_ago_plural: '__count__ sekunder sedan',
            second_in: 'om __count__ sekund',
            second_in_plural: 'om __count__ sekunder',
            minute_ago: '__count__ minut sedan',
            minute_ago_plural: '__count__ minuter sedan',
            minute_in: 'om __count__ minut',
            minute_in_plural: 'om __count__ minuter',
            hour_ago: '__count__ timme sedan',
            hour_ago_plural: '__count__ timmar sedan',
            hour_in: 'om __count__ timme',
            hour_in_plural: 'om __count__ timmar',
            day_ago: '__count__ dag sedan',
            day_ago_plural: '__count__ dagar sedan',
            day_in: 'om __count__ dag',
            day_in_plural: 'om __count__ dagar',
            month_ago: '__count__ månad sedan',
            month_ago_plural: '__count__ månader sedan',
            month_in: 'om __count__ månad',
            month_in_plural: 'om __count__ månader',
            year_ago: '__count__ år sedan',
            year_ago_plural: '__count__ år sedan',
            year_in: 'om __count__ år',
            year_in_plural: 'om __count__ år'
        }
    },
    th: {
        translation: {
            now: 'เมื่อกี้',
            second_ago: '__count__ วินาที ที่ผ่านมา',
            second_ago_plural: '__count__ วินาที ที่ผ่านมา',
            second_in: 'อีก __count__ วินาที',
            second_in_plural: 'อีก __count__ วินาที',
            minute_ago: '__count__ นาที ที่ผ่านมา',
            minute_ago_plural: '__count__ นาที ที่ผ่านมา',
            minute_in: 'อีก __count__ นาที',
            minute_in_plural: 'อีก __count__ นาที',
            hour_ago: '__count__ ชั่วโมง ที่ผ่านมา',
            hour_ago_plural: '__count__ ชั่วโมง ที่ผ่านมา',
            hour_in: 'อีก __count__ ชั่วโมง',
            hour_in_plural: 'อีก __count__ ชั่วโมง',
            day_ago: '__count__ วัน ที่ผ่านมา',
            day_ago_plural: '__count__ วัน ที่ผ่านมา',
            day_in: 'อีก __count__ วัน',
            day_in_plural: 'อีก __count__ วัน'
        }
    },
    zh: {
        translation: {
            now: '刚才',
            second_ago: '__count__ 秒钟前',
            second_ago_plural: '__count__ 秒钟前',
            second_in: '__count__ 秒内',
            second_in_plural: '__count__ 秒内',
            minute_ago: '__count__ 分钟前',
            minute_ago_plural: '__count__ 分钟前',
            minute_in: '__count__ 分钟内',
            minute_in_plural: '__count__ 分钟内',
            hour_ago: '__count__ 小时前',
            hour_ago_plural: '__count__ 小时前',
            hour_in: '__count__ 小时内',
            hour_in_plural: '__count__ 小时内',
            day_ago: '__count__ 天前',
            day_ago_plural: '__count__ 天前',
            day_in: '__count__ 天内',
            day_in_plural: '__count__ 天内',
            month_ago: '__count__ 月前',
            month_ago_plural: '__count__ 月前',
            month_in: '__count__ 月内',
            month_in_plural: '__count__ 月内',
            year_ago: '__count__ 年前',
            year_ago_plural: '__count__ 年前',
            year_in: '__count__ 年内',
            year_in_plural: '__count__ 年内'
        }
    },
    'zh-CN': {
        translation: {
            now: '刚才',
            second_ago: '__count__ 秒钟前',
            second_ago_plural: '__count__ 秒钟前',
            second_in: '__count__ 秒内',
            second_in_plural: '__count__ 秒内',
            minute_ago: '__count__ 分钟前',
            minute_ago_plural: '__count__ 分钟前',
            minute_in: '__count__ 分钟内',
            minute_in_plural: '__count__ 分钟内',
            hour_ago: '__count__ 小时前',
            hour_ago_plural: '__count__ 小时前',
            hour_in: '__count__ 小时内',
            hour_in_plural: '__count__ 小时内',
            day_ago: '__count__ 天前',
            day_ago_plural: '__count__ 天前',
            day_in: '__count__ 天内',
            day_in_plural: '__count__ 天内',
            month_ago: '__count__ 月前',
            month_ago_plural: '__count__ 月前',
            month_in: '__count__ 月内',
            month_in_plural: '__count__ 月内',
            year_ago: '__count__ 年前',
            year_ago_plural: '__count__ 年前',
            year_in: '__count__ 年内',
            year_in_plural: '__count__ 年内'
        }
    },
    'zh-HK': {
        translation: {
            now: '剛才',
            second_ago: '__count__ 秒鐘前',
            second_ago_plural: '__count__ 秒鐘前',
            second_in: '__count__ 秒內',
            second_in_plural: '__count__ 秒內',
            minute_ago: '__count__ 分鐘前',
            minute_ago_plural: '__count__ 分鐘前',
            minute_in: '__count__ 分鐘內',
            minute_in_plural: '__count__ 分鐘內',
            hour_ago: '__count__ 小時前',
            hour_ago_plural: '__count__ 小時前',
            hour_in: '__count__ 小時內',
            hour_in_plural: '__count__ 小時內',
            day_ago: '__count__ 天前',
            day_ago_plural: '__count__ 天前',
            day_in: '__count__ 天內',
            day_in_plural: '__count__ 天內',
            month_ago: '__count__ 月前',
            month_ago_plural: '__count__ 月前',
            month_in: '__count__ 月內',
            month_in_plural: '__count__ 月內',
            year_ago: '__count__ 年前',
            year_ago_plural: '__count__ 年前',
            year_in: '__count__ 年內',
            year_in_plural: '__count__ 年內'
        }
    },
    'zh-TW': {
        translation: {
            now: '剛才',
            second_ago: '__count__ 秒鐘前',
            second_ago_plural: '__count__ 秒鐘前',
            second_in: '__count__ 秒內',
            second_in_plural: '__count__ 秒內',
            minute_ago: '__count__ 分鐘前',
            minute_ago_plural: '__count__ 分鐘前',
            minute_in: '__count__ 分鐘內',
            minute_in_plural: '__count__ 分鐘內',
            hour_ago: '__count__ 小時前',
            hour_ago_plural: '__count__ 小時前',
            hour_in: '__count__ 小時內',
            hour_in_plural: '__count__ 小時內',
            day_ago: '__count__ 天前',
            day_ago_plural: '__count__ 天前',
            day_in: '__count__ 天內',
            day_in_plural: '__count__ 天內',
            month_ago: '__count__ 月前',
            month_ago_plural: '__count__ 月前',
            month_in: '__count__ 月內',
            month_in_plural: '__count__ 月內',
            year_ago: '__count__ 年前',
            year_ago_plural: '__count__ 年前',
            year_in: '__count__ 年內',
            year_in_plural: '__count__ 年內'
        }
    }
};
// tslint:enable

var RelativeTime = /** @class */ (function () {
    function RelativeTime(service, ea) {
        var _this = this;
        this.service = service;
        this.ea = ea;
        this.service.i18nextReady().then(function () {
            _this.setup();
        });
        this.ea.subscribe(I18N_EA_SIGNAL, function (locales) {
            _this.setup(locales);
        });
    }
    RelativeTime.inject = function () { return [I18N, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_8__["EventAggregator"]]; };
    RelativeTime.prototype.setup = function (locales) {
        var trans = translations;
        var fallbackLng = this.service.i18next.fallbackLng;
        var alternateFb = fallbackLng || this.service.i18next.options.fallbackLng;
        if (Array.isArray(alternateFb) && alternateFb.length > 0) {
            alternateFb = alternateFb[0];
        }
        var key = ((locales && locales.newValue)
            ? locales.newValue
            : this.service.getLocale()) || alternateFb;
        var index = 0;
        // tslint:disable-next-line:no-conditional-assignment
        if ((index = key.indexOf("-")) >= 0) {
            var baseLocale = key.substring(0, index);
            if (trans[baseLocale]) {
                this.addTranslationResource(baseLocale, trans[baseLocale].translation);
            }
        }
        if (trans[key]) {
            this.addTranslationResource(key, trans[key].translation);
        }
        if (trans[fallbackLng]) {
            this.addTranslationResource(key, trans[fallbackLng].translation);
        }
    };
    RelativeTime.prototype.addTranslationResource = function (key, translation) {
        var options = this.service.i18next.options;
        if (options.interpolation && (options.interpolation.prefix !== "__" || options.interpolation.suffix !== "__")) {
            // tslint:disable-next-line:forin
            for (var subkey in translation) {
                translation[subkey] = translation[subkey]
                    .replace("__count__", (options.interpolation.prefix || "{{") + "count" + (options.interpolation.suffix || "}}"));
            }
        }
        this.service.i18next.addResources(key, options.defaultNS || "translation", translation);
    };
    RelativeTime.prototype.getRelativeTime = function (time) {
        var now = new Date();
        var diff = now.getTime() - time.getTime();
        var timeDiff = this.getTimeDiffDescription(diff, "year", 31104000000);
        if (!timeDiff) {
            timeDiff = this.getTimeDiffDescription(diff, "month", 2592000000);
            if (!timeDiff) {
                timeDiff = this.getTimeDiffDescription(diff, "day", 86400000);
                if (!timeDiff) {
                    timeDiff = this.getTimeDiffDescription(diff, "hour", 3600000);
                    if (!timeDiff) {
                        timeDiff = this.getTimeDiffDescription(diff, "minute", 60000);
                        if (!timeDiff) {
                            timeDiff = this.getTimeDiffDescription(diff, "second", 1000);
                            if (!timeDiff) {
                                timeDiff = this.service.tr("now");
                            }
                        }
                    }
                }
            }
        }
        return timeDiff;
    };
    RelativeTime.prototype.getTimeDiffDescription = function (diff, unit, timeDivisor) {
        var unitAmount = parseInt((diff / timeDivisor).toFixed(0), 10);
        if (unitAmount > 0) {
            return this.service.tr(unit, { count: unitAmount, context: "ago" });
        }
        else if (unitAmount < 0) {
            var abs = Math.abs(unitAmount);
            return this.service.tr(unit, { count: abs, context: "in" });
        }
        return null;
    };
    return RelativeTime;
}());

var RtValueConverter = /** @class */ (function () {
    function RtValueConverter(service) {
        this.service = service;
    }
    RtValueConverter.inject = function () { return [RelativeTime]; };
    RtValueConverter.prototype.toView = function (value) {
        if (value === null
            || typeof value === "undefined"
            || (typeof value === "string" && value.trim() === "")) {
            return value;
        }
        if (typeof value === "string" && isNaN(value) && !Number.isInteger(value)) {
            value = new Date(value);
        }
        return this.service.getRelativeTime(value);
    };
    RtValueConverter = __decorate([
        Object(aurelia_binding__WEBPACK_IMPORTED_MODULE_9__["valueConverter"])("rt")
    ], RtValueConverter);
    return RtValueConverter;
}());

var Backend = /** @class */ (function () {
    function Backend(services, options) {
        if (options === void 0) { options = {}; }
        this.services = services;
        this.options = options;
        this.type = "backend";
        this.init(services, options);
    }
    Backend.with = function (loader) {
        this.loader = loader;
        return this;
    };
    Backend.prototype.init = function (services, options) {
        if (options === void 0) { options = {}; }
        this.services = services;
        this.options = Object.assign({}, {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
            addPath: "locales/add/{{lng}}/{{ns}}",
            allowMultiLoading: false,
            parse: JSON.parse
        }, options);
    };
    Backend.prototype.readMulti = function (languages, namespaces, callback) {
        var loadPath = this.options.loadPath;
        if (typeof this.options.loadPath === "function") {
            loadPath = this.options.loadPath(languages, namespaces);
        }
        var url = this.services
            .interpolator
            .interpolate(loadPath, { lng: languages.join("+"), ns: namespaces.join("+") });
        this.loadUrl(url, callback);
    };
    Backend.prototype.read = function (language, namespace, callback) {
        var loadPath = this.options.loadPath;
        if (typeof this.options.loadPath === "function") {
            loadPath = this.options.loadPath([language], [namespace]);
        }
        var url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });
        this.loadUrl(url, callback);
    };
    Backend.prototype.loadUrl = function (url, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var response, ret, err, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Backend.loader.loadText(url)];
                    case 1:
                        response = _b.sent();
                        ret = void 0;
                        err = void 0;
                        try {
                            ret = (response instanceof Object) ? response : this.options.parse(response, url);
                        }
                        catch (e) {
                            err = "failed parsing " + url + " to json";
                        }
                        if (err) {
                            return [2 /*return*/, callback(err, false)];
                        }
                        callback(null, ret);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        callback("failed loading " + url, false /* no retry */);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // tslint:disable-next-line:variable-name
    Backend.prototype.create = function (_languages, _namespace, _key, _fallbackValue) {
        // not supported
    };
    Backend.type = "backend";
    return Backend;
}());

function configure(frameworkConfig, cb) {
    if (typeof cb !== "function") {
        var errorMsg = "You need to provide a callback method to properly configure the library";
        throw errorMsg;
    }
    var instance = frameworkConfig.container.get(I18N);
    var ret = cb(instance);
    frameworkConfig.globalResources([
        TValueConverter,
        TBindingBehavior,
        TCustomAttribute,
        TParamsCustomAttribute,
        NfValueConverter,
        NfBindingBehavior,
        DfValueConverter,
        DfBindingBehavior,
        RtValueConverter,
        RtBindingBehavior
    ]);
    frameworkConfig.postTask(function () {
        var resources = frameworkConfig.container.get(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewResources"]);
        var htmlBehaviorResource = resources.getAttribute("t");
        var htmlParamsResource = resources.getAttribute("t-params");
        var attributes = instance.i18next.options.attributes;
        // Register default attributes if none provided
        if (!attributes) {
            attributes = ["t", "i18n"];
        }
        attributes.forEach(function (alias) { return resources.registerAttribute(alias, htmlBehaviorResource, "t"); });
        attributes.forEach(function (alias) { return resources.registerAttribute(alias + "-params", htmlParamsResource, "t-params"); });
    });
    return ret;
}




/***/ })

}]);
//# sourceMappingURL=npm.aurelia-i18n.90a24122e17b94ee4c48.js.map