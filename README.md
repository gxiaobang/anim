# tw.js
## 轻量级的动画补间库

## 使用示例

### html部分
```html
<script src="./build/js/tw.js"></script>
<div id="box"></div>
```

### css部分
```css
#box {
	position: absolute;
	left: 10px;
	top: 10px;
	
	width: 100px;
	height: 100px;
	backgournd: yellow;
}
```

### js部分
```javascript
tw('#box', {
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
	ease: 'Quad.easeIn'
});
```
