'use strict';

var _anim = require('./anim.js');

var _util = require('./util.js');

var type = (0, _util.getDOM)('#type')[0],
    ease = (0, _util.getDOM)('#ease')[0],
    distance = (0, _util.getDOM)('#distance')[0],
    duration = (0, _util.getDOM)('#duration')[0];

var animObj = (0, _anim.anim)('#box');

(0, _util.getDOM)('#btnRun')[0].onclick = function () {
		animObj.set('tween', type.value + '.' + ease.value).set('from', {}).set('to', { left: distance.value }).set('duration', duration.value).un('complete').on('complete', function () {
				console.log('animatte is complete.');
		}).run();
};

(0, _util.getDOM)('#btnStop')[0].onclick = function () {
		return animObj.stop();
};

(0, _util.getDOM)('#btnReset')[0].onclick = function () {
		return (0, _util.setStyle)('#box', { left: 0 });
};
//# sourceMappingURL=test.js.map
