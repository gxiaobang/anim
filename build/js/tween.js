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
	}
};

exports.Tween = Tween;
//# sourceMappingURL=tween.js.map
