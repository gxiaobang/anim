import Anim from './anim.js';
import { $s, setStyle } from './util.js';


var type = $s('#type')[0],
		ease = $s('#ease')[0],
		distance = $s('#distance')[0],
		duration = $s('#duration')[0];

var anim = new Anim('#box')
	.on('complete', () => {
		console.log('animatte is complete.');
	});


addEvent('#btnRun', 'click', () => {
	anim
		.set('tween', `${type.value}.${ease.value}`)
		.set('to', { left: distance.value })
		.set('duration', duration.value)
		.run();
});

addEvent('#btnStop', 'click', () => animObj.stop());
addEvent('#btnReset', 'click', () => setStyle('#box', { left: 0 }));