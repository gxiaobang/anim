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

exports.getDOM = getDOM;
exports.getStyle = getStyle;
exports.setStyle = setStyle;
exports.mixin = mixin;
exports.requestAnim = requestAnim;
//# sourceMappingURL=util.js.map
