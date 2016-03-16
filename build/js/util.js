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
		poprs[name] = value;
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

var requestAnim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
	return setTimeout(fn, 1000 / 60);
};

exports.getDOM = getDOM;
exports.getStyle = getStyle;
exports.setStyle = setStyle;
exports.requestAnim = requestAnim;
//# sourceMappingURL=util.js.map
