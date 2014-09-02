fx
==

Animation Framework

### 动画模块　
		new Fx(element)
			.animOptions(options)
			.run();

		animOptions设置参数
			Options 
			{
				to: {} //设置目标状态
				from: {} //开始状态
				duration: string //持续时间
				type: string //动画类型
				ease: string //缓动
				onComplete: function //动画完成是执行
				isReverse: boolean //是否回放
			}
		run 执行动画
