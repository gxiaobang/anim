
/**
 * fx 动画模块
 * author: bang
 * date: 2014-8-19
 * versions: 1.0
 */


;(function (golbal){

// 创建队列数组
var queues=[];
function Fx()
{
    this._init.apply(this, arguments);
}
Fx.prototype={
    fps: 60,
    defaultView: document.defaultView,

    _init: function (nodes){
        if(!nodes.length)
        {
            nodes=[nodes];
        }

        this.nodes=nodes;
    },
    attr: function (obj, attr, value){
        // 设置
        if(arguments.length>2 || attr.constructor==Object)
        {
            var propertys={};

            if(typeof attr=='string')
            {
                propertys[attr]=value;
            }
            else
            {
            	propertys=attr;
            }

            for(var name in propertys)
            {
            	value=propertys[name];
                if(name=='opacity')
                {
                    obj.style['opacity']=value;
                    obj.style['filter']='alpha(opacity='+value*100+')';
                }
                else
                {
                    if(!isNaN(value))
                    {
                        value+='px';
                    }
                    obj.style[name]=value;
                }
            }
        }
        // 获取
        else
        {
            // w3c标准
            if(this.defaultView && this.defaultView.getComputedStyle)
            {
                return this.defaultView.getComputedStyle(obj, '')[attr]||null;
            }
            // ie8-
            else
            {
                if(attr=='opacity')
                {
                    var filters=obj.filters.alpha||obj.filters['DXImageTransform.Microsoft.Alpha'];

                    return (filters.opacity||100)/100;
                }
                return obj.currentStyle[attr]||null;
            }
        }
    },
    /**
     * [设置运动参数]
     * @param  {[Json]} options [duration(持续时间), type(缓动类型), from(初始状态), to(目标状态)]
     * @return {[Object]}         [实例对象]
     */
    animOptions: function (options){
        this.options=options||{};

        return this;
    },
    move: function (){
        var _this=this,
            tweenFn=this.options.tweenFn,
            duration=this.options.duration,
            from=this.options.from,
            to=this.options.to,
            nodes=this.nodes,
            startTime=+new Date,
            reverse=function (){
            	var ret={length: 0};

            	for(var name in to)ret[name]=[from[0][name]];

            	return ret;
            }(),
            elespedTime,calc;


        this.options.reverse=reverse;

        this.timerId=setInterval(function (){

            if(_this.isAnim)
            {
                elespedTime=+new Date-startTime;

                if(elespedTime<duration)
                {
                    for(var i=0,node;node=nodes[i];i++)
                    {

                        for(var name in to)
                        {
                        	calc=tweenFn(elespedTime, from[i][name], to[name]-from[i][name], duration);

                            _this.attr(
                                node, name, 
                                // 调用补间动画公式
                                calc
                            )

                            reverse[name].push(calc);
                        }

                        reverse.length+=1;
                    }
                }
                else
                {
                    _this.stop();
                    _this.complete();
                }
            }
            else
            {
                _this.stop();
            }

        }, 1000/this.fps);
    },
    stop: function (){
        this.isAnim=false;
        clearInterval(this.timerId);
    },
    begin: function (){

        if(queues[0]!==this)return;

        var nodes=this.nodes;

        this.isAnim=true;

        // 起始状态
        if(this.options.from)
        {
            for(var i=0,node;node=nodes[i];i++)
            {
                this.attr(node, this.options.from);
            }
        }
        else
        {
            this.options.from=[];
            for(var i=0,node;node=nodes[i];i++)
            {
                this.options.from[i]={};
                for(var name in this.options.to)
                {
                    this.options.from[i][name]=parseFloat(this.attr(node, name))||0;
                }
            }
        }

        var tweenFn=Tween.Quart.easeOut;
        if(this.options.type)
        {
        	if(this.options.type=='Linear')
        	{
        		tweenFn=Tween.Linear;
        	}
            else
            {
            	tweenFn=Tween[this.options.type][this.options.ease];
            }
        }

        this.options.tweenFn=tweenFn||tweenFn;
    },
    complete: function (){
        queues.shift();
        if(queues.length>0)
        {
            queues[0].begin();
            queues[0].move();
        }

        if(this.options.isReverse)
        {
        	this.makeReverse();
        }
        else
        {
        	this.attr(this.nodes[0], this.options.to);
        	this.options.onComplete&&this.options.onComplete.call(this);
        }
        
    },
    // 回放
    makeReverse: function (){

    	var now=this.options.reverse.length,
    		_this=this;

    	delete this.options.isReverse;

    	(function move(){

    		now--;
    		if(now>-1)
    		{
    			for(var name in _this.options.reverse)
    			{
    				if(name!=='length')
    				{

    					_this.attr(_this.nodes[0], name, _this.options.reverse[name][now]);
    				}
    				
    			}
    			

    			setTimeout(move, 1000/_this.fps)
    		}
    		else
    		{
    			_this.options.onComplete&&_this.options.onComplete.call(_this);
    		}

    	})();
    },
    // 队列
    queue: function (){
        queues.push(this);
    },
    run: function (){

        this.queue();  
        this.begin();
        this.move();  
    }
};

golbal.Fx=Fx;

})(this);
