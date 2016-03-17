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

var _util = require('./util.js');

var _tween = require('./tween.js');

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
