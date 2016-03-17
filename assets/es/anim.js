/**
 * tw.js
 * 轻量级的动画补间库
 * by bang
 */

import { getDOM, getStyle, setStyle, requestAnim } from './util.js';
import { tween } from './Tween.js';

// 补间动画
class Anim {
	constructor(el, options) {
		this.el = getDOM(el)[0];
		this.fn = {};
		this.from = options.from || {};
		this.to = options.to || {};
		this.duration = Anim.toMs(options.duration) || '400';
		this.easeFn = Anim.getTween(options.tween);
		this.run();
	}
	// 运行
	run() {
		this.begin();
		const loop = () => {
			this.elespedTime = +new Date - this.startTime;
			if (this.elespedTime > this.duration) {
				this.complete();
			}
			else {
				this.moving();
				requestAnim(loop);
			}
		};

		requestAnim(loop);
	}
	// 开始
	begin() {
		this.startTime = +new Date;
		for (let name in this.to) {
			if (!this.from.hasOwnProperty(name)) {
				this.from[ name ] = parseFloat(getStyle(this.el, name));
			}
		}
		this.fn.begin && this.fn.begin();
	}
	// 执行动画中，按fps触发
	moving() {
		let t, b, c, d;
		for (let name in this.to) {
			t = this.elespedTime;
			b = parseFloat(this.from[name]);
			c = parseFloat(this.to[name]) - b;
			d = this.duration;

			setStyle(this.el, name, this.easeFn(t, b, c, d));
		}
		this.fn.moving && this.fn.moving();
	}
	// 完成动画
	complete() {
		setStyle(this.el, this.to);
		this.fn.complete && this.fn.complete();
	}

	// 转化成毫秒
	static toMs(ms) {
		return /\ds$/.test(ms) ? parseFloat(ms) * 1000 : parseFloat(ms);
	}

	// 获取缓动公式
	static getTween(tween) {
		let arr = tween.split('.');
		if (arr[0] == 'Linear') {
			return Tween[arr[0]];
		}
		else {
			return Tween[arr[0]][arr[1]];
		}
	}
}

export const anim = (el, props) => {
	new Anim(el, props);
};