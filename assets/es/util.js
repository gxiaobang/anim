/**
 * util.js
 * 工具类
 * by bang
 */

// 获取dom节点
const getDOM = ( expr, root = document ) => {
	return root.querySelectorAll(expr);
};

// 设置样式
const getStyle = ( el, name ) => {
	// 标准
	if (window.getComputedStyle) {
		return window.getComputedStyle( el, '' )[ name ] || null;
	}
	// IE8-
	else {
		// 透明度
		if (name == 'opacity') {
			return (el.filters.alpha || el.filters['DXImageTransform.Microsoft.Alpha'] || 100) / 100;
		}
		else {
			return el.currentStyle[ name ] || null;
		}
	}
};

// 获取样式
const setStyle = ( el, name, value ) => {
	var props = {};
	if (arguments.length == 3 && typeof name == 'string') {
		poprs[ name ] = value;
	}
	else {
		props = name;
	}

	for (let name in props) {
		if (name == 'opacity') {
			el.style.opacity = props[ name ];
			el.style.filter = 'alpha(filter=' + (props[ name ] / 100) + ')';
		}
		else if (isNaN( props[name] )) {
			el.style[ name ] = props[ name ];
		}
		else {
			el.style[ name ] = props[ name ] + 'px';
		}
	}
};

const requestAnim = window.requestAnimationFrame || 
										window.webkitRequestAnimationFrame ||
										window.mozRequestAnimationFrame  ||
										window.msRequestAnimationFrame  ||
										(fn => setTimeout(fn, 1000 / 60));

export { getDOM, getStyle, setStyle, requestAnim };