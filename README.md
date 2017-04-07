# DOM动画

## 带缓动公式DOM动画，提供各种动画方式

### 前言
DOM的动画特效，有各种形式。由快变慢、由慢变快、弹力变化、回退变化等等。在flash有各种的动画公式，叫做缓动公式。把这些公式运作在web端，同样能使DOM实现炫酷的动画效果。 

### 项目启动
```bash
npm run start
```

### 语法
`new GoAnim(el, options)`

### 参数
options |type           |default    |description
--------|---------------|-----------|------------
form    |JSON           |当前样式   |起始样式
to      |JSON           |无          |目标样式
duration|String\|Number |400ms      |持续时间
tween   |String         |ease-out   |缓动方式


### 使用示例
```javascript
// 动画参数配置
const goAnim = new GoAnim('#foo', {
  form: { left: '10px' }, // 起始位置
  to: { left: '200px' },  // 结束位置
  duration: '500ms',      // 持续时间
  tween: 'ease-out'       // 补间类型
});
goAnim.run();   // 运行
```

### 修改日志 2017/4//7
+ gulp改成webpack打包
+ 增加webpack-dev-server运行示例