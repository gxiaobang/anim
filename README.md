# tw.js
## 轻量级的动画补间库

结合(缓动公式)[https://github.com/zhangxinxu/Tween/blob/master/tween.js]，能够选择不同类型的缓动方式完成动画。

anim(el, options);

## 使用示例
```javascript
anim('#box', {
	// 起始位置(可选)
	from: {
		left: '10px',
		top: '10px'
	},
	// 结束位置
	to: {
		left: '400px',
		top: '500px'
	},
	// 持续时间(可选)
	duration: '500ms',
	// 缓动方式(可选)
	tween: 'Quad.easeIn'
});
```
