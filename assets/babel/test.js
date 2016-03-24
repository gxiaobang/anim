import { anim } from './anim.js';
import { getDOM, setStyle } from './util.js';


var type = getDOM('#type')[0],
		ease = getDOM('#ease')[0],
		distance = getDOM('#distance')[0],
		duration = getDOM('#duration')[0];

var animObj = anim('#box');

getDOM('#btnRun')[0].onclick = () => {
	animObj
		.set('tween', `${type.value}.${ease.value}`)
		.set('from', {})
		.set('to', { left: distance.value })
		.set('duration', duration.value)
		.un('complete')
		.on('complete', () => {
			console.log('animatte is complete.');
		})
		.run();
};
		
getDOM('#btnStop')[0].onclick = () => animObj.stop();

getDOM('#btnReset')[0].onclick = () => setStyle('#box', { left: 0 });