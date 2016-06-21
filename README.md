# anim 动画库

## 结合缓动公式，实现不同的动画补间

## `new Anim(el, options)`
## options
参数		|类型						|默认值			|描述
--------|---------------|-----------|------------
form		|Json						|当前样式		|起始样式
to			|Json						|无					|目标样式
duration|String\|Number |400ms 			|持续时间
tween		|String					|ease-out		|缓动方式


## 使用示例
```javascript
var anim = new Anim('#foo', {
	form: { left: '10px' },
	to: { left: '200px' },
	duration: '500ms',
	tween: 'ease-out'
});
anim.run();		// 执行
```
