/**
 * fx 动画模块
 * author: bang
 * date: 2014-8-19
 * versions: 1.0
 */

;(function( global ) {

var FPS = 60,
    DOC = document,
    WIN = DOC.defaultView;

// 数据类型
function typeOf( obj ) {
    var type = Object.prototype.toString.call( obj );

    return type.substring( 8, type.length - 1 );
}

// 获取样式
function getStyle( node, attr ) {
    // W3C标准
    if( WIN && WIN.getComputedStyle ) {
        return WIN.getComputedStyle( node, '' )[ attr ] || null;
    }
    // IE8-
    else {
        if( attr === 'opacity' ) {
            var filters = obj.filters.alpha ||
                            obj.filters[ 'DXImageTransform.Microsoft.Alpha' ];

            return ( filters.opacity || 100 ) / 100;
        }
        else {
            return node.currentStyle[ attr ] || null;
        }
    }
}
// 设置样式
function setStyle( node, attr, value ) {
    var attrs = {},
        name;

    if( arguments.length === 3 && typeOf( attr ) === 'String' ) {
        attrs[ attr ] = value;
    }
    else {
        attrs = attr;
    }

    for( name in attrs ) {
        if( name === 'opacity' ) {
            node.style.opacity = attrs[ name ];
            node.style.filter = 'alpha(filter=' + (attrs[ name ] / 100) + ')';
        }
        else if( isNaN( attrs[ name ] ) ) {
            node.style[ name ] = attrs[ name ];
        }
        else {
            node.style[ name ] = attrs[ name ] + 'px';
        }
    }
}

// 创建Fx
function Fx() {
    this._init.apply( this, arguments );
}
Fx.prototype = {
    _init: function( node ) {
        this.node = node;
    },
    // 设置运动参数
    animOptions: function( options ) {
        this.options = options;

        return this;
    },
    // 开始
    start: function() {
        
        if( !this.isAnim ) {
            this.isAnim = true;
            this.intend();
            this.move();
        }
    },
    // 获取初始化参数
    intend: function() {
        this.options.from = this.options.from || {};
        for( var name in this.options.to ) {
            this.options.to[ name ] = parseFloat( this.options.to[ name ] );
            if( !this.options.from[ name ] ) {
                this.options.from[ name ] = parseFloat( getStyle( this.node, name ) );
            }
            else {
                this.options.from[ name ] = parseFloat( this.options.from[ name ] );
            }
        }

        // 缓动函数
        this.options.type = this.options.type || 'Quart';
        this.options.ease = this.options.ease || 'easeOut';
        if( this.options.type === 'Linear' ) {
            this.options.fTween = Tween.Linear;
        }
        else {
            this.options.fTween = Tween[ this.options.type ][ this.options.ease ];
        }
    },
    // 补间动画
    move: function() {
        var _this = this,
            // 运动所需要的参数
            fTween = this.options.fTween,
            duration = this.options.duration || 400,
            from = this.options.from,
            to = this.options.to,
            startTime = +new Date,
            reverse = this.options.reverse = {},
            anim, elespedTime, calc, name;

        anim = function() {
            elespedTime = +new Date - startTime;

            if( _this.isAnim ) {
                for( name in to ) {
                    calc = fTween( elespedTime, from[ name ], to[ name ] - from[ name ], duration );
                    setStyle( _this.node, name, calc );
                    
                    if( !reverse[ name ] ) reverse[ name ] = [];
                    reverse[ name ].push( calc );
                }
                
                if( elespedTime < duration ) {
                    global.requestAnimFrame( anim );
                }
                else {
                    if( _this.options.isReverse ) {
                        _this.makeReverse();
                    }
                    else {
                        _this.complete( _this.options.to );
                    }
                }
            }
        };

        global.requestAnimFrame( anim );
    },
    // 停止
    stop: function() {
        this.isAnim = false;
    },
    // 运动完成
    complete: function( attrs ) {
        this.stop();
        setStyle( this.node, attrs );
        this.options.onComplete && this.options.onComplete.call( this );
    },
    // 回放
    makeReverse: function() {
        var _this = this,
            keys = Object.keys( this.options.from ),
            n = this.options.reverse[ keys[0] ].length,
            name;

        function callback_reverse() {
            if( _this.isAnim ) {
                if( --n > -1 ) {
                    for( name in _this.options.from ) {
                        setStyle( _this.node, name, _this.options.reverse[ name ][n] );
                    }

                    global.requestAnimFrame( callback_reverse );
                }
                else {
                    _this.complete( _this.options.from );
                }
            }
        }

        global.requestAnimFrame( callback_reverse );
    },
    // 运行
    run: function() {
        this.start();
    }
};

global.Fx = Fx;

})( this );
