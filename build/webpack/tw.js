/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.tw = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * tw.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 轻量级的动画补间库
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by bang
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _util = __webpack_require__(1);

	var _ease = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// 补间动画

	var Tween = function () {
		function Tween() {
			_classCallCheck(this, Tween);
		}

		_createClass(Tween, [{
			key: 'constrctor',
			value: function constrctor(el, props) {
				this.el = (0, _util.getDom)(el);
				this.fn = {};
				this.from = props.from || {};
				this.to = props.to || {};
				this.duration = props.duration || '400ms';
				this.easeFn = _ease.ease[props.ease];
				this.run();
			}
			// 运行

		}, {
			key: 'run',
			value: function run() {
				var _this = this;

				for (var name in this.to) {
					if (!this.from.hasOwenProperty(name)) {
						this.from[name] = parseFloat((0, _util.getStyle)(this.el, name));
					}
				}

				var loop = function loop() {
					_this.nowTime = +new Date();
					if (_this.nowTime - _this.startTime > _this.duration) {
						_this.complete();
					} else {
						(0, _util.requestAnim)(loop);
					}
				};

				(0, _util.requestAnim)(loop);
			}
			// 开始

		}, {
			key: 'begin',
			value: function begin() {
				this.startTime = +new Date();
				this.fn.begin && this.fn.begin();
			}
			// 执行动画中，按fps触发

		}, {
			key: 'moving',
			value: function moving() {
				this.fn.moving && this.fn.moving();
			}
			// 完成动画

		}, {
			key: 'complete',
			value: function complete() {
				this.fn.complete && this.fn.complete();
			}
		}]);

		return Tween;
	}();

	var tw = exports.tw = function tw(el, props) {
		new Tween(el, props);
	};
	//# sourceMappingURL=tw.js.map


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var _arguments = arguments;
	/**
	 * util.js
	 * 工具类
	 * by bang
	 */

	// 获取dom节点
	var getDOM = function getDOM(expr) {
		var root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

		return root.querySelectorAll(expr);
	};

	// 设置样式
	var getStyle = function getStyle(el, name) {
		// 标准
		if (window.getComputedStyle) {
			return window.getComputedStyle(el, '')[name] || null;
		}
		// IE8-
		else {
				// 透明度
				if (name == 'opacity') {
					return (el.filters.alpha || el.filters['DXImageTransform.Microsoft.Alpha'] || 100) / 100;
				} else {
					return el.currentStyle[name] || null;
				}
			}
	};

	// 获取样式
	var setStyle = function setStyle(el, name, value) {
		var props = {};
		if (_arguments.length == 3 && typeof name == 'string') {
			poprs[name] = value;
		} else {
			props = name;
		}

		for (var _name in props) {
			if (_name == 'opacity') {
				el.style.opacity = props[_name];
				el.style.filter = 'alpha(filter=' + props[_name] / 100 + ')';
			} else if (isNaN(props[_name])) {
				el.style[_name] = props[_name];
			} else {
				el.style[_name] = props[_name] + 'px';
			}
		}
	};

	var requestAnim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
		return setTimeout(fn, 1000 / 60);
	};

	exports.getDOM = getDOM;
	exports.getStyle = getStyle;
	exports.setStyle = setStyle;
	exports.requestAnim = requestAnim;
	//# sourceMappingURL=util.js.map


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * 缓动公式
	 */

	var ease = {
		ease: function ease() {},
		easeIn: function easeIn() {},
		easeOut: function easeOut() {}
	};

	exports.ease = ease;
	//# sourceMappingURL=ease.js.map


/***/ }
/******/ ]);