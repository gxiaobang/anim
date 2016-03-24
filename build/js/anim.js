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

var _util = require('./util.js');

var _tween = require('./tween.js');

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
