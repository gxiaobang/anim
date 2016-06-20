/**
 * tw.js
 * 动画库
 * by bang
 */
import {
	BaseMethod, 
	isFunction, isArray, 
	$s, getStyle, setStyle, requestAnim } from './util.js';
import Tween from './tween.js';

// 补间动画
class Anim extends BaseMethod {
	constructor(el, options) {
		this.el = $s(el)[0];
		this.queue = [];
		this.addQueue(options || {});
	}

	// 清除
	stop() {
		this.animated = false;
		this.shiftQueue();
		return this;
	}

	// 添加队列
	addQueue({ from, to, duration, tween }) {
		this.queue.push({
			from: from || {},
			to: to || {},
			duration: Anim.toMs(duration) || '400',
			easeFn: Anim.getTween(tween)
		});
	}
	// 清除队列
	clearQueue() {
		this.queue = [];
	}

	shiftQueue() {
		this.queue.unshift();
	}

	// 运行
	run() {
		this.begin();
		var { duration } = this.queue[0];
		const loop = () => {
			// 停止
			if (!this.animated) return;

			this.elespedTime = +new Date - this.startTime;
			if (this.elespedTime > duration) {
				this.complete();
			}
			else {
				this.moving();
				requestAnim(loop);
			}
		};

		requestAnim(loop);
		return this;
	}
	// 开始
	begin() {
		this.animated = true;
		this.startTime = +new Date;

		var { from, to } = this.queue[0];

		for (let name in to) {
			if (!from.hasOwnProperty(name)) {
				from[ name ] = parseFloat(getStyle(this.el, name)) || 0;
			}
		}
		this.trigger(this.fn.begin, this, this.el);
		return this;
	}
	// 执行动画中，按fps触发
	moving() {
		var t, b, c, d;
		var { from, to, duration, easeFn } = this.queue[0];
		for (let name in to) {
			t = this.elespedTime;
			b = parseFloat(from[name]);
			c = parseFloat(to[name]) - b;
			d = duration;

			setStyle(this.el, name, easeFn(t, b, c, d));
		}
		this.trigger(this.fn.moving, this, this.el);
		return this;
	}
	// 完成动画
	complete() {
		var { to } = this.queue[0];
		this.animated = false;
		setStyle(this.el, to);
		this.shiftQueue();
		this.trigger(this.fn.complete, this, this.el);
		return this;
	}

	// 转化成毫秒
	static toMs(ms) {
		return /\ds$/.test(ms) ? parseFloat(ms) * 1000 : parseFloat(ms);
	}

	// 获取缓动公式
	static getTween(type) {
		if (typeof type == 'string') {
			let arr = type.split('.');
			if (arr[0] == 'Linear') {
				return Tween[arr[0]];
			}
			else {
				return Tween[arr[0]][arr[1]];
			}
		}
	}
}

export default Anim;