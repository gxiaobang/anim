import { anim } from './anim.js';
import { getDOM } from './util.js';


var type = getDOM('#type')[0],
		ease = getDOM('#ease')[0];

var animObj = anim('#box', {
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

getDOM('#btnRun')[0].onclick = () => 
		animObj.set('tween', `${type.value}.${ease.value}`).run();
getDOM('#btnStop')[0].onclick = () => animObj.stop();