import Anim from './anim.js';
import { $s, setStyle, addEvent } from './util.js';


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
		.setOptions({
			to: { left: distance.value },
			tween: `${type.value}.${ease.value}`,
			duration: duration.value
		})
		.run();
});

addEvent('#btnStop', 'click', () => anim.stop());
addEvent('#btnReset', 'click', () => setStyle('#box', { left: 0 }));