'use strict';

var _anim = require('./anim.js');

var _util = require('./util.js');

var type = (0, _util.getDOM)('#type')[0],
    ease = (0, _util.getDOM)('#ease')[0];

var animObj = (0, _anim.anim)('#box', {
	// 起始位置(可选)
	from: {
		left: '10px'
	},
	// 结束位置
	to: {
		left: '600px'
	},
	// 持续时间(可选)
	duration: '1000ms'
});

(0, _util.getDOM)('#btnRun')[0].onclick = function () {
	return animObj.set('tween', type.value + '.' + ease.value).run();
};
(0, _util.getDOM)('#btnStop')[0].onclick = function () {
	return animObj.stop();
};
//# sourceMappingURL=test.js.map
