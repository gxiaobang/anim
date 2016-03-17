'use strict';

var _anim = require('./anim.js');

var _util = require('./util.js');

var type = (0, _util.getDOM)('#type')[0],
    ease = (0, _util.getDOM)('#ease')[0],
    btn = (0, _util.getDOM)('#btn')[0];

btn.onclick = function () {
	(0, _anim.anim)('#box', {
		// 起始位置(可选)
		from: {
			marginLeft: '10px'
		},
		// 结束位置
		to: {
			marginLeft: '500px'
		},
		// 持续时间(可选)
		duration: '500ms',
		// 缓动方式(可选)
		tween: type.value + '.' + ease.value
	});
};
//# sourceMappingURL=test.js.map
