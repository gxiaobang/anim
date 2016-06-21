/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(3);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	var _tween = __webpack_require__(3);
	
	var _tween2 = _interopRequireDefault(_tween);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * tw.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 动画库
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * by bang
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	// 补间动画
	
	var Anim = function (_BaseMethod) {
		_inherits(Anim, _BaseMethod);
	
		function Anim(el, options) {
			_classCallCheck(this, Anim);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Anim).call(this));
	
			_this.el = (0, _util.$s)(el)[0];
			_this.queue = [];
			// this.addQueue(options || {});
			_this.initFn('complete');
			return _this;
		}
	
		// 清除
	
	
		_createClass(Anim, [{
			key: 'stop',
			value: function stop() {
				this.animated = false;
				this.shiftQueue();
				return this;
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
				this.queue.shift();
			}
	
			// 运行
	
		}, {
			key: 'run',
			value: function run() {
				var _this2 = this;
	
				this.begin();
				var duration = this.queue[0].duration;
	
				var loop = function loop() {
					// 停止
					if (!_this2.animated) return;
	
					_this2.elespedTime = +new Date() - _this2.startTime;
					if (_this2.elespedTime > duration) {
						_this2.complete();
					} else {
						_this2.moving();
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
	
				this.stop();
				(0, _util.setStyle)(this.el, to);
				this.trigger('complete', this, this.el);
				return this;
			}
	
			// 设置参数
	
		}, {
			key: 'setOptions',
			value: function setOptions() {
				var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
				this.addQueue(options);
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
						return _tween2.default[arr[0]];
					} else {
						return _tween2.default[arr[0]][arr[1]];
					}
				}
			}
		}]);
	
		return Anim;
	}(_util.BaseMethod);
	
	exports.default = Anim;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * util.js
	 * 工具类
	 * by bang
	 */
	
	// 无操作
	function noop() {}
	
	// 基于class
	
	var BaseMethod = function () {
		function BaseMethod() {
			_classCallCheck(this, BaseMethod);
	
			this.fn = {};
		}
	
		// 初始化监听事件
	
	
		_createClass(BaseMethod, [{
			key: 'initFn',
			value: function initFn() {
				var _this = this;
	
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				forEach(args, function (name) {
					_this.fn[name] = [];
				});
			}
	
			// 安装事件
	
		}, {
			key: 'on',
			value: function on(type, fn) {
				if (isArray(this.fn[type])) {
					this.fn[type].push(fn);
				}
				return this;
			}
			// 卸载事件
	
		}, {
			key: 'un',
			value: function un(type, fn) {
				if (isArray(this.fn[type])) {
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
	
			// 修改设置属性
	
		}, {
			key: 'set',
			value: function set(prop, value) {
				this[prop] = value;
				return this;
			}
			// 修改添加属性
	
		}, {
			key: 'add',
			value: function add(prop, value) {
				if (isArray(this[prop])) {
					this[prop].push(value);
				}
				return this;
			}
	
			// 触发事件
	
		}, {
			key: 'trigger',
			value: function trigger(fn, obj) {
				for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
					args[_key2 - 2] = arguments[_key2];
				}
	
				var result;
				if (isFunction(fn)) {
					result = fn.call.apply(fn, [obj].concat(args));
				} else if (isArray(fn)) {
					fn.forEach(function (f) {
						result = f.call.apply(f, [obj].concat(args));
						return result;
					});
				} else if (isString(fn)) {
					result = this.trigger.apply(this, [this.fn[fn], obj].concat(args));
				}
	
				return result !== false;
			}
		}]);
	
		return BaseMethod;
	}();
	
	// 类型判断
	
	
	var obt = Object.prototype.toString;
	function isType(type) {
		return function (obj) {
			return obt.call(obj) === '[object ' + type + ']';
		};
	}
	
	var isObject = isType('Object'),
	    isArray = isType('Array'),
	    isNumber = isType('Number'),
	    isString = isType('String'),
	    isFunction = isType('Function');
	
	// 驼峰命名
	function named(name) {
		return name.replace(/[-]\w/g, function (a) {
			return a.charAt(1).toUpperCase();
		});
	}
	
	// 获取dom节点
	function $s(expr) {
		var root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	
		if ((typeof expr === 'undefined' ? 'undefined' : _typeof(expr)) === 'object') {
			if (expr.nodeType !== 1) {
				return expr;
			} else {
				return [expr];
			}
		}
		return root.querySelectorAll(expr);
	}
	
	// 获取索引
	function getIndex(source) {
		var arr = arguments.length <= 1 || arguments[1] === undefined ? source.parentNode.children : arguments[1];
	
		return [].indexOf.call(arr, source);
	}
	
	// 获取range
	function getRange() {
		var range = document.createRange();
		range.selectNodeContents(document.body);
	
		getRange = function getRange() {
			return range;
		};
		return getRange();
	}
	
	// 解析html
	function parseDOM(html) {
		var range = getRange();
	
		if (range.createContextualFragment) {
			return range.createContextualFragment(html);
		} else {
			var fragment = document.createDocumentFragment();
			var div = document.createElement('div');
			div.innerHTML = html;
			while (div.firstChild) {
				fragment.appendChild(div.firstChild);
			}
			return fragment;
		}
	}
	
	// 解析表单
	function parseForm(form) {
		var json = {};
		forEach(form.elements, function (element) {
			var name = element.name;
			var type = element.type;
			if (name) {
				switch (type) {
					case 'radio':
					case 'checkbox':
						if (element.checked) {
							json[name] = element.value || 'true';
						}
						break;
					default:
						json[name] = element.value;
						break;
				}
			}
		});
		return json;
	}
	
	// 设置样式
	function getStyle(el, name) {
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
	}
	
	// 获取样式
	function setStyle(el, name, value) {
	
		if (isString(el)) {
			el = $s(el)[0];
		} else if (isArray(el)) {
			forEach(el, function (elem) {
				return setStyle(elem, name, value);
			});
		}
	
		var props = {};
		if (arguments.length == 3 && typeof name == 'string') {
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
	}
	
	// className
	function hasClass(el, className) {
		if (el.classList) {
			return el.classList.contains(className);
		} else {
			var list = el.className.split(/\s+/g);
			return list.indexOf(className) > -1;
		}
	}
	function addClass(el, className) {
		if (el.classList) {
			el.classList.add(className);
		} else {
			if (!hasClass(el, className)) {
				var list = el.className.split(/\s+/g);
				list.push(className);
				el.className = list.join(' ');
			}
		}
	}
	function removeClass(el, className) {
		if (el.classList) {
			el.classList.remove(className);
		} else {
			if (hasClass(el, className)) {
				var list = el.className.split(/\s+/g);
				list.splice(list.indexOf(className), 1);
				el.className = list.join(' ');
			}
		}
	}
	function toggleClass(el, className) {
		if (hasClass(el, className)) {
			removeClass(el, className);
		} else {
			addClass(el, className);
		}
	}
	
	// 兼容事件
	function fixEvent(event) {
		event = event || window.event;
	
		if (!event.target) {
			event.target = event.srcElement;
		}
	
		if (!event.stopPropagation) {
			event.stopPropagation = function () {
				event.cancelBubble = true;
			};
		}
	
		if (!event.preventDefault) {
			event.preventDefault = function () {
				event.returnValue = false;
			};
		}
	
		return event;
	}
	
	// 判断包含关系
	function contains(e1, e2) {
		if (e1.contains) {
			return e1.contains(e2);
		} else {
			return e1.compareDocumentPosition(e2) == 16;
		}
	}
	
	// 事件绑定
	function addEvent(el, type, expr, fn) {
		// el.addEventListener(type, fn, false);
	
		if (isString(el)) {
			el = $s(el);
		}
	
		if (el.length && el.nodeType != 1) {
			forEach(el, function (elem) {
				addEvent(elem, type, expr, fn);
			});
		} else {
			if (isFunction(expr)) {
				fn = expr;
	
				/*let handler = (event) => fn.call(el, fixEvent(event));
	   handler.fn = fn;*/
				if (suports.is('addEventListener')) {
					el.addEventListener(type, fn, false);
				} else {
					el.attachEvent('on' + type, fn);
				}
			} else {
				delegate(el, type, expr, fn);
			}
		}
	}
	
	// 事件解绑
	function removeEvent(el, type, fn) {
		if (suports.is('removeEventListener')) {
			el.removeEventListener(type, fn);
		} else {
			el.detachEvent('on' + type, fn);
		}
	}
	
	// 事件委托
	function delegate(el, type, expr, fn) {
		addEvent(el, type, function (event) {
			event = fixEvent(event);
			var target = event.target;
	
			if (suports.is('matches')) {
				while (target && target !== el) {
					if (target.matches(expr)) {
						fn && fn.call(target, event);
						break;
					}
					target = target.parentNode;
				}
			} else {
				var els = $s(expr);
				els = Array.from(els);
				while (target !== el) {
					if (els.indexOf(el) > -1) {
						fn && fn.call(target, event);
						break;
					}
					target = target.parentNode;
				}
			}
		});
	}
	
	// 动画帧
	var requestAnim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
		return setTimeout(fn, 1000 / 60);
	};
	
	// 遍历类数组
	function forEach(array, func) {
		if (isFunction(func)) {
			for (var i = 0, len = array.length; i < len; i++) {
				if (func(array[i], i) === false) break;
			}
		}
	}
	
	// 混合 类似于extend
	function mixin(target) {
		for (var _len3 = arguments.length, sources = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			sources[_key3 - 1] = arguments[_key3];
		}
	
		forEach(sources, function (source) {
			for (var key in source) {
				target[key] = source[key];
			}
		});
		return target;
	}
	
	// 模板
	function templ(str) {
		for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			args[_key4 - 1] = arguments[_key4];
		}
	
		str = str.replace(/\{(\d+)\}/gm, function (m, n) {
			return args[n] || '';
		});
		return str;
	}
	
	// 日期输出格式
	function dateFormat(fmt, date) {
		date = date || new Date();
		function _pad(num) {
			if (num < 10) {
				num = '0' + num;
			}
			return num;
		}
	
		return String(fmt).replace(/yyyy|MM|dd|HH|mm|ss|D/g, function (m) {
			switch (m) {
				case 'yyyy':
					return date.getFullYear();
				case 'MM':
					return _pad(date.getMonth() + 1);
				case 'dd':
					return _pad(date.getDate());
				case 'HH':
					return _pad(date.getHours());
				case 'mm':
					return _pad(date.getMinutes());
				case 'ss':
					return _pad(date.getSeconds());
				case 'D':
					var locDays = ['日', '一', '二', '三', '四', '五', '六'];
					return _pad(locDays[date.getDay()]);
			}
		});
	}
	
	// 获取相对页面所在位置
	function getPoint(el) {
		var x = 0,
		    y = 0;
	
		while (el) {
			x += el.offsetLeft;
			y += el.offsetTop;
	
			el = el.offsetParent;
		}
	
		return {
			x: x, y: y
		};
	}
	
	// 检测浏览器支持
	var suports = {
		_cache: {},
		is: function is(prop) {
			return true;
		},
	
		// 获取支持属性
		get: function get(prop) {
			if (this._cache[prop]) return this._cache[prop];
			return prop;
		}
	};
	
	exports.noop = noop;
	exports.BaseMethod = BaseMethod;
	exports.isObject = isObject;
	exports.isNumber = isNumber;
	exports.isArray = isArray;
	exports.isString = isString;
	exports.isFunction = isFunction;
	exports.forEach = forEach;
	exports.getIndex = getIndex;
	exports.$s = $s;
	exports.parseDOM = parseDOM;
	exports.parseForm = parseForm;
	exports.getStyle = getStyle;
	exports.setStyle = setStyle;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.hasClass = hasClass;
	exports.toggleClass = toggleClass;
	exports.contains = contains;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.fixEvent = fixEvent;
	exports.templ = templ;
	exports.dateFormat = dateFormat;
	exports.getPoint = getPoint;
	exports.mixin = mixin;
	exports.requestAnim = requestAnim;
	exports.suports = suports;

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
	
	exports.default = Tween;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(5);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _anim = __webpack_require__(1);
	
	var _anim2 = _interopRequireDefault(_anim);
	
	var _util = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var type = (0, _util.$s)('#type')[0],
	    ease = (0, _util.$s)('#ease')[0],
	    distance = (0, _util.$s)('#distance')[0],
	    duration = (0, _util.$s)('#duration')[0];
	
	var anim = new _anim2.default('#box').on('complete', function () {
		console.log('animatte is complete.');
	});
	
	(0, _util.addEvent)('#btnRun', 'click', function () {
		anim.setOptions({
			to: { left: distance.value },
			tween: type.value + '.' + ease.value,
			duration: duration.value
		}).run();
	});
	
	(0, _util.addEvent)('#btnStop', 'click', function () {
		return anim.stop();
	});
	(0, _util.addEvent)('#btnReset', 'click', function () {
		return (0, _util.setStyle)('#box', { left: 0 });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=entry.js.map