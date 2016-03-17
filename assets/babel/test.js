import { anim } from './anim.js';
import { getDOM } from './util.js';


var type = getDOM('#type')[0],
		ease = getDOM('#ease')[0],
		btn = getDOM('#btn')[0];

btn.onclick = function() {
	anim('#box', {
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
		tween: `${type.value}.${ease.value}`
	});
};