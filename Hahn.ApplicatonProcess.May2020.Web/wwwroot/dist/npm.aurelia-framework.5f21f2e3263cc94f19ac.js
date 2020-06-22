(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.aurelia-framework"],{

/***/ "aurelia-framework":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Aurelia", function() { return Aurelia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrameworkConfiguration", function() { return FrameworkConfiguration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogManager", function() { return LogManager; });
/* harmony import */ var aurelia_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/aurelia-logging/dist/native-modules/aurelia-logging.js");
/* harmony import */ var aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/aurelia-dependency-injection/dist/native-modules/aurelia-dependency-injection.js");
/* harmony import */ var aurelia_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/aurelia-loader/dist/native-modules/aurelia-loader.js");
/* harmony import */ var aurelia_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/aurelia-templating/dist/native-modules/aurelia-templating.js");
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/aurelia-pal/dist/native-modules/aurelia-pal.js");
/* harmony import */ var aurelia_path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/aurelia-path/dist/native-modules/aurelia-path.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resolver", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["resolver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StrategyResolver", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["StrategyResolver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Lazy", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["Lazy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "All", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["All"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Optional", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["Optional"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Parent", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["Parent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Factory", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["Factory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewInstance", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["NewInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDecoratorDependencies", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["getDecoratorDependencies"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lazy", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["lazy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "all", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["all"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "optional", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["optional"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parent", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["parent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "factory", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["factory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "newInstance", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["newInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invoker", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["invoker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invokeAsFactory", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["invokeAsFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FactoryInvoker", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["FactoryInvoker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registration", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["registration"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transient", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["transient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "singleton", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["singleton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransientRegistration", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["TransientRegistration"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SingletonRegistration", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["SingletonRegistration"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_emptyParameters", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["_emptyParameters"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvocationHandler", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["InvocationHandler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["Container"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "autoinject", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["autoinject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inject", function() { return aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["inject"]; });

/* harmony import */ var aurelia_binding__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/aurelia-binding/dist/native-modules/aurelia-binding.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getArrayObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["getArrayObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMapObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["getMapObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSetObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["getSetObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "targetContext", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["targetContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sourceContext", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["sourceContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "camelCase", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["camelCase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createOverrideContext", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["createOverrideContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getContextFor", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["getContextFor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createScopeForTest", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["createScopeForTest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "connectable", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["connectable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enqueueBindingConnect", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["enqueueBindingConnect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setConnectQueueThreshold", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["setConnectQueueThreshold"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enableConnectQueue", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["enableConnectQueue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "disableConnectQueue", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["disableConnectQueue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getConnectQueueSize", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["getConnectQueueSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscriberCollection", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["subscriberCollection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpressionObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ExpressionObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calcSplices", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["calcSplices"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeSplice", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["mergeSplice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "projectArraySplices", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["projectArraySplices"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getChangeRecords", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["getChangeRecords"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModifyCollectionObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ModifyCollectionObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollectionLengthObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["CollectionLengthObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Expression", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["Expression"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BindingBehavior", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["BindingBehavior"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueConverter", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ValueConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Assign", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["Assign"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Conditional", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["Conditional"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccessThis", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["AccessThis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccessScope", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["AccessScope"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccessMember", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["AccessMember"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccessKeyed", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["AccessKeyed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CallScope", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["CallScope"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CallMember", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["CallMember"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CallFunction", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["CallFunction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Binary", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["Binary"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Unary", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["Unary"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LiteralPrimitive", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["LiteralPrimitive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LiteralString", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["LiteralString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LiteralTemplate", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["LiteralTemplate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LiteralArray", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["LiteralArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LiteralObject", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["LiteralObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Unparser", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["Unparser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpressionCloner", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ExpressionCloner"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneExpression", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["cloneExpression"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bindingMode", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["bindingMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Parser", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["Parser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParserImplementation", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ParserImplementation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "delegationStrategy", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["delegationStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventManager", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["EventManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventSubscriber", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["EventSubscriber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirtyChecker", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["DirtyChecker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirtyCheckProperty", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["DirtyCheckProperty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "propertyAccessor", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["propertyAccessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrimitiveObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["PrimitiveObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetterObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["SetterObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "XLinkAttributeObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["XLinkAttributeObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dataAttributeAccessor", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["dataAttributeAccessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataAttributeObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["DataAttributeObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StyleObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["StyleObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueAttributeObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ValueAttributeObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckedObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["CheckedObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectValueObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["SelectValueObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ClassObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasDeclaredDependencies", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["hasDeclaredDependencies"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "declarePropertyDependencies", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["declarePropertyDependencies"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computedFrom", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["computedFrom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComputedExpression", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ComputedExpression"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createComputedObserver", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["createComputedObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "elements", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["elements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "presentationElements", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["presentationElements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "presentationAttributes", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["presentationAttributes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVGAnalyzer", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["SVGAnalyzer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObserverLocator", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ObserverLocator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectObservationAdapter", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ObjectObservationAdapter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BindingExpression", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["BindingExpression"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Binding", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["Binding"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CallExpression", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["CallExpression"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Call", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["Call"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueConverterResource", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ValueConverterResource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valueConverter", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["valueConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BindingBehaviorResource", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["BindingBehaviorResource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bindingBehavior", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["bindingBehavior"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListenerExpression", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["ListenerExpression"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Listener", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["Listener"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NameExpression", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["NameExpression"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BindingEngine", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["BindingEngine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "observable", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["observable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "connectBindingToSignal", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["connectBindingToSignal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "signalBindings", function() { return aurelia_binding__WEBPACK_IMPORTED_MODULE_6__["signalBindings"]; });

/* harmony import */ var aurelia_metadata__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/aurelia-metadata/dist/native-modules/aurelia-metadata.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "metadata", function() { return aurelia_metadata__WEBPACK_IMPORTED_MODULE_7__["metadata"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Origin", function() { return aurelia_metadata__WEBPACK_IMPORTED_MODULE_7__["Origin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decorators", function() { return aurelia_metadata__WEBPACK_IMPORTED_MODULE_7__["decorators"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deprecated", function() { return aurelia_metadata__WEBPACK_IMPORTED_MODULE_7__["deprecated"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mixin", function() { return aurelia_metadata__WEBPACK_IMPORTED_MODULE_7__["mixin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "protocol", function() { return aurelia_metadata__WEBPACK_IMPORTED_MODULE_7__["protocol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationEvent", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["animationEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animator", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["Animator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompositionTransactionNotifier", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["CompositionTransactionNotifier"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompositionTransactionOwnershipToken", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["CompositionTransactionOwnershipToken"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompositionTransaction", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["CompositionTransaction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_hyphenate", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["_hyphenate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_isAllWhitespace", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["_isAllWhitespace"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewEngineHooksResource", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewEngineHooksResource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "viewEngineHooks", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["viewEngineHooks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElementEvents", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ElementEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResourceLoadContext", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ResourceLoadContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewCompileInstruction", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewCompileInstruction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BehaviorInstruction", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["BehaviorInstruction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TargetInstruction", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["TargetInstruction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "viewStrategy", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["viewStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RelativeViewStrategy", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["RelativeViewStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConventionalViewStrategy", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ConventionalViewStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NoViewStrategy", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["NoViewStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateRegistryViewStrategy", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["TemplateRegistryViewStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InlineViewStrategy", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["InlineViewStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticViewStrategy", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["StaticViewStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewLocator", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewLocator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BindingLanguage", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["BindingLanguage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlotCustomAttribute", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["SlotCustomAttribute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PassThroughSlot", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["PassThroughSlot"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShadowSlot", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ShadowSlot"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShadowDOM", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ShadowDOM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateBehaviorName", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["validateBehaviorName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewResources", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewResources"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["View"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewSlot", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewSlot"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoundViewFactory", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["BoundViewFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewFactory", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewCompiler", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewCompiler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResourceModule", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ResourceModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResourceDescription", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ResourceDescription"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModuleAnalyzer", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ModuleAnalyzer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewEngine", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewEngine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["Controller"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BehaviorPropertyObserver", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["BehaviorPropertyObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BindableProperty", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["BindableProperty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HtmlBehaviorResource", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["HtmlBehaviorResource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "children", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["children"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "child", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["child"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SwapStrategies", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["SwapStrategies"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompositionEngine", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["CompositionEngine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElementConfigResource", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ElementConfigResource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resource", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["resource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "behavior", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["behavior"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "customElement", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["customElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "customAttribute", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["customAttribute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateController", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["templateController"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bindable", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["bindable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dynamicOptions", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["dynamicOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useShadowDOM", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["useShadowDOM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "processAttributes", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["processAttributes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "processContent", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["processContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "containerless", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["containerless"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useViewStrategy", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["useViewStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useView", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["useView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inlineView", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["inlineView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noView", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["noView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "view", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["view"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "elementConfig", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["elementConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "viewResources", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["viewResources"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplatingEngine", function() { return aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["TemplatingEngine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateDependency", function() { return aurelia_loader__WEBPACK_IMPORTED_MODULE_2__["TemplateDependency"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateRegistryEntry", function() { return aurelia_loader__WEBPACK_IMPORTED_MODULE_2__["TemplateRegistryEntry"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return aurelia_loader__WEBPACK_IMPORTED_MODULE_2__["Loader"]; });

/* harmony import */ var aurelia_task_queue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/aurelia-task-queue/dist/native-modules/aurelia-task-queue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TaskQueue", function() { return aurelia_task_queue__WEBPACK_IMPORTED_MODULE_8__["TaskQueue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "relativeToFile", function() { return aurelia_path__WEBPACK_IMPORTED_MODULE_5__["relativeToFile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "join", function() { return aurelia_path__WEBPACK_IMPORTED_MODULE_5__["join"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildQueryString", function() { return aurelia_path__WEBPACK_IMPORTED_MODULE_5__["buildQueryString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseQueryString", function() { return aurelia_path__WEBPACK_IMPORTED_MODULE_5__["parseQueryString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AggregateError", function() { return aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["AggregateError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FEATURE", function() { return aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["FEATURE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLATFORM", function() { return aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["PLATFORM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["DOM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isInitialized", function() { return aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["isInitialized"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initializePAL", function() { return aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["initializePAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["reset"]; });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };










function preventActionlessFormSubmit() {
  aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["DOM"].addEventListener('submit', function (evt) {
    var target = evt.target;
    var action = target.action;

    if (target.tagName.toLowerCase() === 'form' && !action) {
      evt.preventDefault();
    }
  });
}

var Aurelia = function () {
  function Aurelia(loader, container, resources) {
    

    this.loader = loader || new aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["PLATFORM"].Loader();
    this.container = container || new aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__["Container"]().makeGlobal();
    this.resources = resources || new aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewResources"]();
    this.use = new FrameworkConfiguration(this);
    this.logger = aurelia_logging__WEBPACK_IMPORTED_MODULE_0__["getLogger"]('aurelia');
    this.hostConfigured = false;
    this.host = null;

    this.use.instance(Aurelia, this);
    this.use.instance(aurelia_loader__WEBPACK_IMPORTED_MODULE_2__["Loader"], this.loader);
    this.use.instance(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewResources"], this.resources);
  }

  Aurelia.prototype.start = function start() {
    var _this = this;

    if (this._started) {
      return this._started;
    }

    this.logger.info('Aurelia Starting');
    return this._started = this.use.apply().then(function () {
      preventActionlessFormSubmit();

      if (!_this.container.hasResolver(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["BindingLanguage"])) {
        var message = 'You must configure Aurelia with a BindingLanguage implementation.';
        _this.logger.error(message);
        throw new Error(message);
      }

      _this.logger.info('Aurelia Started');
      var evt = aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["DOM"].createCustomEvent('aurelia-started', { bubbles: true, cancelable: true });
      aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["DOM"].dispatchEvent(evt);
      return _this;
    });
  };

  Aurelia.prototype.enhance = function enhance() {
    var _this2 = this;

    var bindingContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var applicationHost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    this._configureHost(applicationHost || aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["DOM"].querySelectorAll('body')[0]);

    return new Promise(function (resolve) {
      var engine = _this2.container.get(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["TemplatingEngine"]);
      _this2.root = engine.enhance({ container: _this2.container, element: _this2.host, resources: _this2.resources, bindingContext: bindingContext });
      _this2.root.attached();
      _this2._onAureliaComposed();
      resolve(_this2);
    });
  };

  Aurelia.prototype.setRoot = function setRoot() {
    var _this3 = this;

    var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var applicationHost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var instruction = {};

    if (this.root && this.root.viewModel && this.root.viewModel.router) {
      this.root.viewModel.router.deactivate();
      this.root.viewModel.router.reset();
    }

    this._configureHost(applicationHost);

    var engine = this.container.get(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["TemplatingEngine"]);
    var transaction = this.container.get(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["CompositionTransaction"]);
    delete transaction.initialComposition;

    if (!root) {
      if (this.configModuleId) {
        root = Object(aurelia_path__WEBPACK_IMPORTED_MODULE_5__["relativeToFile"])('./app', this.configModuleId);
      } else {
        root = 'app';
      }
    }

    instruction.viewModel = root;
    instruction.container = instruction.childContainer = this.container;
    instruction.viewSlot = this.hostSlot;
    instruction.host = this.host;

    return engine.compose(instruction).then(function (r) {
      _this3.root = r;
      instruction.viewSlot.attached();
      _this3._onAureliaComposed();
      return _this3;
    });
  };

  Aurelia.prototype._configureHost = function _configureHost(applicationHost) {
    if (this.hostConfigured) {
      return;
    }
    applicationHost = applicationHost || this.host;

    if (!applicationHost || typeof applicationHost === 'string') {
      this.host = aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["DOM"].getElementById(applicationHost || 'applicationHost');
    } else {
      this.host = applicationHost;
    }

    if (!this.host) {
      throw new Error('No applicationHost was specified.');
    }

    this.hostConfigured = true;
    this.host.aurelia = this;
    this.hostSlot = new aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewSlot"](this.host, true);
    this.hostSlot.transformChildNodesIntoView();
    this.container.registerInstance(aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["DOM"].boundary, this.host);
  };

  Aurelia.prototype._onAureliaComposed = function _onAureliaComposed() {
    var evt = aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["DOM"].createCustomEvent('aurelia-composed', { bubbles: true, cancelable: true });
    setTimeout(function () {
      return aurelia_pal__WEBPACK_IMPORTED_MODULE_4__["DOM"].dispatchEvent(evt);
    }, 1);
  };

  return Aurelia;
}();

var logger = aurelia_logging__WEBPACK_IMPORTED_MODULE_0__["getLogger"]('aurelia');
var extPattern = /\.[^/.]+$/;

function runTasks(config, tasks) {
  var current = void 0;
  var next = function next() {
    current = tasks.shift();
    if (current) {
      return Promise.resolve(current(config)).then(next);
    }

    return Promise.resolve();
  };

  return next();
}

function loadPlugin(fwConfig, loader, info) {
  logger.debug('Loading plugin ' + info.moduleId + '.');
  if (typeof info.moduleId === 'string') {
    fwConfig.resourcesRelativeTo = info.resourcesRelativeTo;

    var id = info.moduleId;

    if (info.resourcesRelativeTo.length > 1) {
      return loader.normalize(info.moduleId, info.resourcesRelativeTo[1]).then(function (normalizedId) {
        return _loadPlugin(normalizedId);
      });
    }

    return _loadPlugin(id);
  } else if (typeof info.configure === 'function') {
    if (fwConfig.configuredPlugins.indexOf(info.configure) !== -1) {
      return Promise.resolve();
    }
    fwConfig.configuredPlugins.push(info.configure);

    return Promise.resolve(info.configure.call(null, fwConfig, info.config || {}));
  }
  throw new Error(invalidConfigMsg(info.moduleId || info.configure, 'plugin'));

  function _loadPlugin(moduleId) {
    return loader.loadModule(moduleId).then(function (m) {
      if ('configure' in m) {
        if (fwConfig.configuredPlugins.indexOf(m.configure) !== -1) {
          return Promise.resolve();
        }
        return Promise.resolve(m.configure(fwConfig, info.config || {})).then(function () {
          fwConfig.configuredPlugins.push(m.configure);
          fwConfig.resourcesRelativeTo = null;
          logger.debug('Configured plugin ' + info.moduleId + '.');
        });
      }

      fwConfig.resourcesRelativeTo = null;
      logger.debug('Loaded plugin ' + info.moduleId + '.');
    });
  }
}

function loadResources(aurelia, resourcesToLoad, appResources) {
  if (Object.keys(resourcesToLoad).length === 0) {
    return Promise.resolve();
  }
  var viewEngine = aurelia.container.get(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["ViewEngine"]);

  return Promise.all(Object.keys(resourcesToLoad).map(function (n) {
    return _normalize(resourcesToLoad[n]);
  })).then(function (loads) {
    var names = [];
    var importIds = [];

    loads.forEach(function (l) {
      names.push(undefined);
      importIds.push(l.importId);
    });

    return viewEngine.importViewResources(importIds, names, appResources);
  });

  function _normalize(load) {
    var moduleId = load.moduleId;
    var ext = getExt(moduleId);

    if (isOtherResource(moduleId)) {
      moduleId = removeExt(moduleId);
    }

    return aurelia.loader.normalize(moduleId, load.relativeTo).then(function (normalized) {
      return {
        name: load.moduleId,
        importId: isOtherResource(load.moduleId) ? addOriginalExt(normalized, ext) : normalized
      };
    });
  }

  function isOtherResource(name) {
    var ext = getExt(name);
    if (!ext) return false;
    if (ext === '') return false;
    if (ext === '.js' || ext === '.ts') return false;
    return true;
  }

  function removeExt(name) {
    return name.replace(extPattern, '');
  }

  function addOriginalExt(normalized, ext) {
    return removeExt(normalized) + '.' + ext;
  }
}

function getExt(name) {
  var match = name.match(extPattern);
  if (match && match.length > 0) {
    return match[0].split('.')[1];
  }
}

function loadBehaviors(config) {
  return Promise.all(config.behaviorsToLoad.map(function (m) {
    return m.load(config.container, m.target);
  })).then(function () {
    config.behaviorsToLoad = null;
  });
}

function assertProcessed(plugins) {
  if (plugins.processed) {
    throw new Error('This config instance has already been applied. To load more plugins or global resources, create a new FrameworkConfiguration instance.');
  }
}

function invalidConfigMsg(cfg, type) {
  return 'Invalid ' + type + ' [' + cfg + '], ' + type + ' must be specified as functions or relative module IDs.';
}

var FrameworkConfiguration = function () {
  function FrameworkConfiguration(aurelia) {
    var _this4 = this;

    

    this.aurelia = aurelia;
    this.container = aurelia.container;

    this.info = [];
    this.processed = false;
    this.preTasks = [];
    this.postTasks = [];

    this.behaviorsToLoad = [];

    this.configuredPlugins = [];
    this.resourcesToLoad = {};
    this.preTask(function () {
      return aurelia.loader.normalize('aurelia-bootstrapper').then(function (name) {
        return _this4.bootstrapperName = name;
      });
    });
    this.postTask(function () {
      return loadResources(aurelia, _this4.resourcesToLoad, aurelia.resources);
    });
  }

  FrameworkConfiguration.prototype.instance = function instance(type, _instance) {
    this.container.registerInstance(type, _instance);
    return this;
  };

  FrameworkConfiguration.prototype.singleton = function singleton(type, implementation) {
    this.container.registerSingleton(type, implementation);
    return this;
  };

  FrameworkConfiguration.prototype.transient = function transient(type, implementation) {
    this.container.registerTransient(type, implementation);
    return this;
  };

  FrameworkConfiguration.prototype.preTask = function preTask(task) {
    assertProcessed(this);
    this.preTasks.push(task);
    return this;
  };

  FrameworkConfiguration.prototype.postTask = function postTask(task) {
    assertProcessed(this);
    this.postTasks.push(task);
    return this;
  };

  FrameworkConfiguration.prototype.feature = function feature(plugin) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    switch (typeof plugin === 'undefined' ? 'undefined' : _typeof(plugin)) {
      case 'string':
        var hasIndex = /\/index$/i.test(plugin);
        var _moduleId = hasIndex || getExt(plugin) ? plugin : plugin + '/index';
        var root = hasIndex ? plugin.substr(0, plugin.length - 6) : plugin;
        this.info.push({ moduleId: _moduleId, resourcesRelativeTo: [root, ''], config: config });
        break;

      case 'function':
        this.info.push({ configure: plugin, config: config || {} });
        break;
      default:
        throw new Error(invalidConfigMsg(plugin, 'feature'));
    }
    return this;
  };

  FrameworkConfiguration.prototype.globalResources = function globalResources(resources) {
    var _this5 = this;

    assertProcessed(this);

    var toAdd = Array.isArray(resources) ? resources : arguments;
    var resource = void 0;
    var resourcesRelativeTo = this.resourcesRelativeTo || ['', ''];

    for (var i = 0, ii = toAdd.length; i < ii; ++i) {
      resource = toAdd[i];
      switch (typeof resource === 'undefined' ? 'undefined' : _typeof(resource)) {
        case 'string':
          var parent = resourcesRelativeTo[0];
          var grandParent = resourcesRelativeTo[1];
          var name = resource;

          if ((resource.startsWith('./') || resource.startsWith('../')) && parent !== '') {
            name = Object(aurelia_path__WEBPACK_IMPORTED_MODULE_5__["join"])(parent, resource);
          }

          this.resourcesToLoad[name] = { moduleId: name, relativeTo: grandParent };
          break;
        case 'function':
          var meta = this.aurelia.resources.autoRegister(this.container, resource);
          if (meta instanceof aurelia_templating__WEBPACK_IMPORTED_MODULE_3__["HtmlBehaviorResource"] && meta.elementName !== null) {
            if (this.behaviorsToLoad.push(meta) === 1) {
              this.postTask(function () {
                return loadBehaviors(_this5);
              });
            }
          }
          break;
        default:
          throw new Error(invalidConfigMsg(resource, 'resource'));
      }
    }

    return this;
  };

  FrameworkConfiguration.prototype.globalName = function globalName(resourcePath, newName) {
    assertProcessed(this);
    this.resourcesToLoad[resourcePath] = { moduleId: newName, relativeTo: '' };
    return this;
  };

  FrameworkConfiguration.prototype.plugin = function plugin(_plugin, pluginConfig) {
    assertProcessed(this);

    var info = void 0;
    switch (typeof _plugin === 'undefined' ? 'undefined' : _typeof(_plugin)) {
      case 'string':
        info = { moduleId: _plugin, resourcesRelativeTo: [_plugin, ''], config: pluginConfig || {} };
        break;
      case 'function':
        info = { configure: _plugin, config: pluginConfig || {} };
        break;
      default:
        throw new Error(invalidConfigMsg(_plugin, 'plugin'));
    }
    this.info.push(info);
    return this;
  };

  FrameworkConfiguration.prototype._addNormalizedPlugin = function _addNormalizedPlugin(name, config) {
    var _this6 = this;

    var plugin = { moduleId: name, resourcesRelativeTo: [name, ''], config: config || {} };
    this.info.push(plugin);

    this.preTask(function () {
      var relativeTo = [name, _this6.bootstrapperName];
      plugin.moduleId = name;
      plugin.resourcesRelativeTo = relativeTo;
      return Promise.resolve();
    });

    return this;
  };

  FrameworkConfiguration.prototype.defaultBindingLanguage = function defaultBindingLanguage() {
    return this._addNormalizedPlugin('aurelia-templating-binding');
  };

  FrameworkConfiguration.prototype.router = function router() {
    return this._addNormalizedPlugin('aurelia-templating-router');
  };

  FrameworkConfiguration.prototype.history = function history() {
    return this._addNormalizedPlugin('aurelia-history-browser');
  };

  FrameworkConfiguration.prototype.defaultResources = function defaultResources() {
    return this._addNormalizedPlugin('aurelia-templating-resources');
  };

  FrameworkConfiguration.prototype.eventAggregator = function eventAggregator() {
    return this._addNormalizedPlugin('aurelia-event-aggregator');
  };

  FrameworkConfiguration.prototype.basicConfiguration = function basicConfiguration() {
    return this.defaultBindingLanguage().defaultResources().eventAggregator();
  };

  FrameworkConfiguration.prototype.standardConfiguration = function standardConfiguration() {
    return this.basicConfiguration().history().router();
  };

  FrameworkConfiguration.prototype.developmentLogging = function developmentLogging(level) {
    var _this7 = this;

    var logLevel = level ? aurelia_logging__WEBPACK_IMPORTED_MODULE_0__["logLevel"][level] : undefined;

    if (logLevel === undefined) {
      logLevel = aurelia_logging__WEBPACK_IMPORTED_MODULE_0__["logLevel"].debug;
    }

    this.preTask(function () {
      return _this7.aurelia.loader.normalize('aurelia-logging-console', _this7.bootstrapperName).then(function (name) {
        return _this7.aurelia.loader.loadModule(name).then(function (m) {
          aurelia_logging__WEBPACK_IMPORTED_MODULE_0__["addAppender"](new m.ConsoleAppender());
          aurelia_logging__WEBPACK_IMPORTED_MODULE_0__["setLevel"](logLevel);
        });
      });
    });

    return this;
  };

  FrameworkConfiguration.prototype.apply = function apply() {
    var _this8 = this;

    if (this.processed) {
      return Promise.resolve();
    }

    return runTasks(this, this.preTasks).then(function () {
      var loader = _this8.aurelia.loader;
      var info = _this8.info;
      var current = void 0;

      var next = function next() {
        current = info.shift();
        if (current) {
          return loadPlugin(_this8, loader, current).then(next);
        }

        _this8.processed = true;
        _this8.configuredPlugins = null;
        return Promise.resolve();
      };

      return next().then(function () {
        return runTasks(_this8, _this8.postTasks);
      });
    });
  };

  return FrameworkConfiguration;
}();













var LogManager = aurelia_logging__WEBPACK_IMPORTED_MODULE_0__;

/***/ })

}]);
//# sourceMappingURL=npm.aurelia-framework.5f21f2e3263cc94f19ac.js.map