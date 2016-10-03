# DOM动画

## 缓动公式DOM动画

### 简介
DOM的动画特效，有各种形式。由快变慢、由慢变快、弹力变化、回退变化等等。在flash时代，就有大神总结出一堆计算公式，叫做缓动公式。利用这些公式，我们就可以实现不同的动画特效。 

### 语法
`new Anim(el, options)`

### 参数
options	|type						|default		|description
--------|---------------|-----------|------------
form		|Json						|当前样式		|起始样式
to			|Json						|无					|目标样式
duration|String\|Number |400ms 			|持续时间
tween		|String					|ease-out		|缓动方式


### 使用示例
```javascript
var anim = new Anim('#foo', {
	form: { left: '10px' },
	to: { left: '200px' },
	duration: '500ms',
	tween: 'ease-out'
});
anim.run();		// 运行
```