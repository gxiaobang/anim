/**
 * 缓动公式
 */

const Tween = {
	Linear(t, b, c, d) {
		return c*t/d + b;
	},
	Quad: {
		easeIn(t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOut(t, b, c, d) {
			return -c *(t /= d)*(t-2) + b;
		},
		easeInOut(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn(t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOut(t, b, c, d) {
			return c * ((t = t/d - 1) * t * t + 1) + b;
		},
		easeInOut(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
	    return c / 2*((t -= 2) * t * t + 2) + b;
		}
	},
	Quart: {
		easeIn(t, b, c, d) {
			return c * (t /= d) * t * t*t + b;
		},
		easeOut(t, b, c, d) {
			return -c * ((t = t/d - 1) * t * t*t - 1) + b;
		},
		easeInOut(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
		}
	},
	Quint: {
		easeIn(t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOut(t, b, c, d) {
			return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
		},
		easeInOut(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2*((t -= 2) * t * t * t * t + 2) + b;
		}
	},
	
	Sine: {
		easeIn(t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut(t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut(t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
		}
	}
};

export { Tween };