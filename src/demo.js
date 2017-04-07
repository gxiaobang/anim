import GoAnim from './lib/go-anim.js';
import { $s, setStyle, addEvent } from './lib/util.js';


var type = $s('#type')[0],
		ease = $s('#ease')[0],
		distance = $s('#distance')[0],
		duration = $s('#duration')[0];

var goAnim = new GoAnim('#box')
	.on('complete', () => {
		console.log('animation is complete.');
	});


addEvent('#btnRun', 'click', () => {
	goAnim
		.setOptions({
			to: { left: distance.value },
			tween: `${type.value}.${ease.value}`,
			duration: duration.value
		})
		.run();
});

addEvent('#btnStop', 'click', () => goAnim.stop());
addEvent('#btnReset', 'click', () => setStyle('#box', { left: 0 }));