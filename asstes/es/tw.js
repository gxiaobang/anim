/**
 * tw.js
 * 轻量级的动画补间库
 * by bang
 */

import { getDom, getStyle, setStyle, requestAnim } from './util.js';
import { tween } from './tween.js';

// 补间动画
class Tween {
	constrctor(el, props) {
		this.el = getDom(el);
		this.fn = {};
		this.from = props.from || {};
		this.to = props.to || {};
		this.duration = props.duration || '400ms';
		this.easeFn = tween[props.ease];
		this.run();
	}
	// 运行
	run() {
		for (let name in this.to) {
			if (!this.from.hasOwenProperty(name)) {
				this.from[ name ] = parseFloat(getStyle(this.el, name));
			}
		}

		const loop = () => {
			this.nowTime = +new Date;
			if (this.nowTime - this.startTime > this.duration) {
				this.complete();
			}
			else {
				requestAnim(loop);
			}
		};

		requestAnim(loop);
	}
	// 开始
	begin() {
		this.startTime = +new Date;
		this.fn.begin && this.fn.begin();
	}
	// 执行动画中，按fps触发
	moving() {
		this.fn.moving && this.fn.moving();
	}
	// 完成动画
	complete() {
		this.fn.complete && this.fn.complete();
	}
}

export const tw = (el, props) => {
	new Tween(el, props);
};