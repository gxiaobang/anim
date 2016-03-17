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

	var _anim = __webpack_require__(1);

	var _util = __webpack_require__(2);

	var type = (0, _util.getDOM)('#type')[0],
	    ease = (0, _util.getDOM)('#ease')[0],
	    btn = (0, _util.getDOM)('#btn')[0];

	btn.onclick = function () {
		(0, _anim.anim)('#box', {
			// 起始位置(可选)
			from: {
				marginLeft: '10px'
			},
			// 结束位置
			to: {
				marginLeft: '500px'
			},
			// 持续时间(可选)
			duration: '500ms',
			// 缓动方式(可选)
			tween: type.value + '.' + ease.value
		});
	};
	//# sourceMappingURL=test.js.map


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.anim = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * tw.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 轻量级的动画补间库
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by bang
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _util = __webpack_require__(2);

	var _tween = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// 补间动画

	var Anim = function () {
		function Anim(el, options) {
			_classCallCheck(this, Anim);

			this.el = (0, _util.getDOM)(el)[0];
			this.fn = {};
			this.from = options.from || {};
			this.to = options.to || {};
			this.duration = Anim.toMs(options.duration) || '400';
			this.easeFn = Anim.getTween(options.tween);
			this.run();
		}
		// 运行


		_createClass(Anim, [{
			key: 'run',
			value: function run() {
				var _this = this;

				this.begin();
				var loop = function loop() {
					_this.elespedTime = +new Date() - _this.startTime;
					if (_this.elespedTime > _this.duration) {
						_this.complete();
					} else {
						_this.moving();
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
				for (var name in this.to) {
					if (!this.from.hasOwnProperty(name)) {
						this.from[name] = parseFloat((0, _util.getStyle)(this.el, name));
					}
				}
				this.fn.begin && this.fn.begin();
			}
			// 执行动画中，按fps触发

		}, {
			key: 'moving',
			value: function moving() {
				var t = void 0,
				    b = void 0,
				    c = void 0,
				    d = void 0;
				for (var name in this.to) {
					t = this.elespedTime;
					b = parseFloat(this.from[name]);
					c = parseFloat(this.to[name]) - b;
					d = this.duration;

					(0, _util.setStyle)(this.el, name, this.easeFn(t, b, c, d));
				}
				this.fn.moving && this.fn.moving();
			}
			// 完成动画

		}, {
			key: 'complete',
			value: function complete() {
				(0, _util.setStyle)(this.el, this.to);
				this.fn.complete && this.fn.complete();
			}

			// 转化成毫秒

		}], [{
			key: 'toMs',
			value: function toMs(ms) {
				return (/\ds$/.test(ms) ? parseFloat(ms) * 1000 : parseFloat(ms)
				);
			}

			// 获取缓动公式

		}, {
			key: 'getTween',
			value: function getTween(type) {
				var arr = type.split('.');
				if (arr[0] == 'Linear') {
					return _tween.Tween[arr[0]];
				} else {
					return _tween.Tween[arr[0]][arr[1]];
				}
			}
		}]);

		return Anim;
	}();

	var anim = exports.anim = function anim(el, props) {
		new Anim(el, props);
	};
	//# sourceMappingURL=anim.js.map


/***/ },
/* 2 */
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
			props[name] = value;
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
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * 缓动公式
	 */

	var Tween = {
		Linear: function Linear(t, b, c, d) {
			return c * t / d + b;
		},

		Quad: {
			easeIn: function easeIn(t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeOut: function easeOut(t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeInOut: function easeInOut(t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t + b;
				return -c / 2 * (--t * (t - 2) - 1) + b;
			}
		},
		Cubic: {
			easeIn: function easeIn(t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOut: function easeOut(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOut: function easeInOut(t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			}
		},
		Quart: {
			easeIn: function easeIn(t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			easeOut: function easeOut(t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInOut: function easeInOut(t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			}
		},
		Quint: {
			easeIn: function easeIn(t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeOut: function easeOut(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeInOut: function easeInOut(t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			}
		},
		Sine: {
			easeIn: function easeIn(t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOut: function easeOut(t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOut: function easeInOut(t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			}
		},

		Expo: {
			easeIn: function easeIn(t, b, c, d) {
				return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			easeOut: function easeOut(t, b, c, d) {
				return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			easeInOut: function easeInOut(t, b, c, d) {
				if (t == 0) return b;
				if (t == d) return b + c;
				if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		Circ: {
			easeIn: function easeIn(t, b, c, d) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			easeOut: function easeOut(t, b, c, d) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			},
			easeInOut: function easeInOut(t, b, c, d) {
				if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			}
		},
		Elastic: {
			easeIn: function easeIn(t, b, c, d, a, p) {
				var s;
				if (t == 0) return b;
				if ((t /= d) == 1) return b + c;
				if (typeof p == "undefined") p = d * .3;
				if (!a || a < Math.abs(c)) {
					s = p / 4;
					a = c;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			},
			easeOut: function easeOut(t, b, c, d, a, p) {
				var s;
				if (t == 0) return b;
				if ((t /= d) == 1) return b + c;
				if (typeof p == "undefined") p = d * .3;
				if (!a || a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
			},
			easeInOut: function easeInOut(t, b, c, d, a, p) {
				var s;
				if (t == 0) return b;
				if ((t /= d / 2) == 2) return b + c;
				if (typeof p == "undefined") p = d * (.3 * 1.5);
				if (!a || a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
			}
		},
		Back: {
			easeIn: function easeIn(t, b, c, d, s) {
				if (typeof s == "undefined") s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			},
			easeOut: function easeOut(t, b, c, d, s) {
				if (typeof s == "undefined") s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInOut: function easeInOut(t, b, c, d, s) {
				if (typeof s == "undefined") s = 1.70158;
				if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
				return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
			}
		},
		Bounce: {
			easeIn: function easeIn(t, b, c, d) {
				return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
			},
			easeOut: function easeOut(t, b, c, d) {
				if ((t /= d) < 1 / 2.75) {
					return c * (7.5625 * t * t) + b;
				} else if (t < 2 / 2.75) {
					return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
				} else if (t < 2.5 / 2.75) {
					return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
				} else {
					return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
				}
			},
			easeInOut: function easeInOut(t, b, c, d) {
				if (t < d / 2) {
					return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
				} else {
					return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
				}
			}
		}
	};

	exports.Tween = Tween;
	//# sourceMappingURL=tween.js.map


/***/ }
/******/ ]);