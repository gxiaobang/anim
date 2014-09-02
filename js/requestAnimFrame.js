
/**
 * requestAnimFrame Aimation Timing
 * author: bang
 * date: 2014-8-22
 */

;(function( global ) {

var prefix = [ 'ms-', 'moz-', 'webkit-', '' ],
	rdashAlpha = /-([\da-z])/gi,
	// 动画定时器
	requestAnimFrame,
	// 转化驼峰
	camelCase;

	
camelCase = function( string ) {
	return string.replace( rdashAlpha, fcamelCase );
};
fcamelCase = function ( all, letter ) {
	return letter.toUpperCase();
};

requestAnimFrame = function() {
	var count = prefix.length;

	while( count-- ) {
		return window[ camelCase( prefix[ count ] + 'requestAnimationFrame' ) ];
	}

	return function( fn ) {
		var timeout = 1000 / 60,
			start,
			finish;

		return window.setTimeout( function() {
			start = +new Date();
			fn( timeout );
			finish = +new Date();

			timeout = 1000 / 60 - ( finish - start );
		}, timeout );
	};
}();

global.requestAnimFrame = requestAnimFrame;

})( this );

