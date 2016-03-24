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
	    distance = (0, _util.getDOM)('#distance')[0],
	    duration = (0, _util.getDOM)('#duration')[0];

	var animObj = (0, _anim.anim)('#box');

	(0, _util.getDOM)('#btnRun')[0].onclick = function () {
			animObj.set('tween', type.value + '.' + ease.value).set('from', {}).set('to', { left: distance.value }).set('duration', duration.value).un('complete').on('complete', function () {
					console.log('animatte is complete.');
			}).run();
	};

	(0, _util.getDOM)('#btnStop')[0].onclick = function () {
			return animObj.stop();
	};

	(0, _util.getDOM)('#btnReset')[0].onclick = function () {
			return (0, _util.setStyle)('#box', { left: 0 });
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
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 微型动画库
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
			this.fn = {
				begin: [],
				moving: [],
				complete: []
			};
			this.queue = [];
			this.addQueue(options || {});
		}

		// 清除


		_createClass(Anim, [{
			key: 'stop',
			value: function stop() {
				this.animated = false;
				this.shiftQueue();
				return this;
			}
		}, {
			key: 'on',
			value: function on(type, fn) {
				if ((0, _util.isFunction)(fn)) {
					switch (type) {
						case 'begin':
						case 'moving':
						case 'complete':
							this.fn[type].push(fn);
							break;
					}
				}
				return this;
			}
		}, {
			key: 'un',
			value: function un(type, fn) {
				switch (type) {
					case 'begin':
					case 'moving':
					case 'complete':
						if (fn) {
							for (var i = 0, f; f = this.fn[type][i]; i++) {
								if (f === fn) {
									this.fn[type].splice(i, 1);
									i--;
								}
							}
						} else {
							this.fn[type].length = 0;
						}
				}
				return this;
			}

			// 触发事件

		}, {
			key: 'trigger',
			value: function trigger(fn, obj) {
				for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
					args[_key - 2] = arguments[_key];
				}

				if ((0, _util.isFunction)(fn)) {
					fn.call.apply(fn, [obj].concat(args));
				} else if ((0, _util.isArray)(fn)) {
					fn.forEach(function (f) {
						f.call.apply(f, [obj].concat(args));
					});
				}
			}

			// 添加队列

		}, {
			key: 'addQueue',
			value: function addQueue(_ref) {
				var from = _ref.from;
				var to = _ref.to;
				var duration = _ref.duration;
				var tween = _ref.tween;

				this.queue.push({
					from: from || {},
					to: to || {},
					duration: Anim.toMs(duration) || '400',
					easeFn: Anim.getTween(tween)
				});
			}
			// 清除队列

		}, {
			key: 'clearQueue',
			value: function clearQueue() {
				this.queue = [];
			}
		}, {
			key: 'shiftQueue',
			value: function shiftQueue() {
				this.queue.unshift();
			}

			// 运行

		}, {
			key: 'run',
			value: function run() {
				var _this = this;

				this.begin();
				var duration = this.queue[0].duration;

				var loop = function loop() {
					// 停止
					if (!_this.animated) return;

					_this.elespedTime = +new Date() - _this.startTime;
					if (_this.elespedTime > duration) {
						_this.complete();
					} else {
						_this.moving();
						(0, _util.requestAnim)(loop);
					}
				};

				(0, _util.requestAnim)(loop);
				return this;
			}
			// 开始

		}, {
			key: 'begin',
			value: function begin() {
				this.animated = true;
				this.startTime = +new Date();

				var _queue$ = this.queue[0];
				var from = _queue$.from;
				var to = _queue$.to;


				for (var name in to) {
					if (!from.hasOwnProperty(name)) {
						from[name] = parseFloat((0, _util.getStyle)(this.el, name)) || 0;
					}
				}
				this.trigger(this.fn.begin, this, this.el);
				return this;
			}
			// 执行动画中，按fps触发

		}, {
			key: 'moving',
			value: function moving() {
				var t, b, c, d;
				var _queue$2 = this.queue[0];
				var from = _queue$2.from;
				var to = _queue$2.to;
				var duration = _queue$2.duration;
				var easeFn = _queue$2.easeFn;

				for (var name in to) {
					t = this.elespedTime;
					b = parseFloat(from[name]);
					c = parseFloat(to[name]) - b;
					d = duration;

					(0, _util.setStyle)(this.el, name, easeFn(t, b, c, d));
				}
				this.trigger(this.fn.moving, this, this.el);
				return this;
			}
			// 完成动画

		}, {
			key: 'complete',
			value: function complete() {
				var to = this.queue[0].to;

				this.animated = false;
				(0, _util.setStyle)(this.el, to);
				this.shiftQueue();
				this.trigger(this.fn.complete, this, this.el);
				return this;
			}
		}, {
			key: 'set',
			value: function set(prop, value) {
				switch (prop) {
					case 'tween':
						this.queue[0].easeFn = Anim.getTween(value);
						break;
					default:
						this.queue[0][prop] = value;
				}
				return this;
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
				if (typeof type == 'string') {
					var arr = type.split('.');
					if (arr[0] == 'Linear') {
						return _tween.Tween[arr[0]];
					} else {
						return _tween.Tween[arr[0]][arr[1]];
					}
				}
			}
		}]);

		return Anim;
	}();

	var anim = exports.anim = function anim(el, options) {
		return new Anim(el, options);
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

	var noop = function noop() {};

	// 类型判断
	var obt = Object.prototype.toString;
	var isType = function isType(type) {
		return function (obj) {
			return obt.call(obj) === '[object ' + type + ']';
		};
	};

	var isObject = isType('Object'),
	    isArray = isType('Array'),
	    isNumber = isType('Number'),
	    isString = isType('String'),
	    isFunction = isType('Function');

	var named = function named(name) {
		return name.replace(/[-]\w/g, function (a) {
			return a.charAt(1).toUpperCase();
		});
	};

	// 获取dom节点
	var getDOM = function getDOM(expr) {
		var root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

		return root.querySelectorAll(expr);
	};

	// 获取索引
	var getIndex = function getIndex(el) {
		return [].indexOf.call(el.parent.children, el);
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

		if (isString(el)) {
			el = getDOM(el)[0];
		} else if (isArray(el)) {
			forEach(el, function (elem) {
				return setStyle(elem, name, value);
			});
		}

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

	// 动画帧
	var requestAnim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
		return setTimeout(fn, 1000 / 60);
	};

	// 遍历类数组
	var forEach = function forEach(array, func) {
		if (isFunction(func)) {
			for (var i = 0, len = array.length; i < len; i++) {
				if (func(array[i], i) === false) break;
			}
		}
	};

	// 混合 类似于extend
	var mixin = function mixin(target) {
		for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			sources[_key - 1] = arguments[_key];
		}

		forEach(sources, function (source) {
			for (var key in source) {
				target[key] = source[key];
			}
		});
		return target;
	};

	// http请求
	var http = function http(_ref) {
		var method = _ref.method;
		var _ref$url = _ref.url;
		var url = _ref$url === undefined ? '' : _ref$url;
		var _ref$param = _ref.param;
		var param = _ref$param === undefined ? null : _ref$param;
		var _ref$beforeSend = _ref.beforeSend;
		var beforeSend = _ref$beforeSend === undefined ? noop : _ref$beforeSend;
		var _ref$success = _ref.success;
		var success = _ref$success === undefined ? noop : _ref$success;
		var _ref$error = _ref.error;
		var error = _ref$error === undefined ? noop : _ref$error;
		var _ref$complete = _ref.complete;
		var complete = _ref$complete === undefined ? noop : _ref$complete;

		var xhr;
		if (window.XMLHttpRequrest) {
			xhr = new XMLHttpRequrest();
		} else {}

		xhr.onstatechange = function () {
			if (xhr.readyState == 4) {
				switch (xhr.status) {
					case 200:
					// 有缓存
					case 302:
						success(xhr.reText, xhr);
						break;
					case 404:
					case 500:
						error(xhr.statusText, xhr);
						break;
				}
				complete(xhr.statusText, xhr);
			}
		};

		beforeSend();
		if (method == 'POST') {
			xhr.open('POST', url, true);
			xhr.send();
		} else {
			xhr.open();
			xhr.send();
		}
	};

	exports.isObject = isObject;
	exports.isNumber = isNumber;
	exports.isArray = isArray;
	exports.isString = isString;
	exports.isFunction = isFunction;
	exports.getDOM = getDOM;
	exports.getStyle = getStyle;
	exports.setStyle = setStyle;
	exports.mixin = mixin;
	exports.http = http;
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