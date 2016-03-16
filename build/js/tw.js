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

var _util = require('./util.js');

var _ease = require('./ease.js');

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
