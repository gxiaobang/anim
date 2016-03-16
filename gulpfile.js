/**
 * 前端自动化工具
 * 翻译es2015,翻译sass
 */

var gulp = require('gulp'),
		babel = require('gulp-babel'), 	// babel-preset-es2015
		// sass = require('gulp-sass'),
		webpack = require('gulp-webpack'),
		plumber = require('gulp-plumber'),
		sourcemap = require('gulp-sourcemap');


var path = {
	babel: {
		src: './assets/es/**/*.js',
		dest: './assets/js'
	},
	sass: {
		src: './build/sass/**/*.scss',
		dest: './build/css'
	}
};

// 翻译es2015
gulp.task('babel', () => {
	gulp.src(path.babel.src)
		.pipe(plumber())
		.pipe(sourcemap.init())
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(sourcemap.write('./'))
		.pipe(gulp.dest(path.babel.dest));
});

// 翻译sass
gulp.task('sass', () => {
	gulp.src(path.sass.src)
		.pipe(plumber())
		.pipe(sourcemap.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemap.write('./'))
		.pipe(gulp.dest(path.sass.dest));
});

gulp.task('babel:watch', ['babel']);
gulp.task('sass:watch', ['sass']);

gulp.task('watch', ['babel:watch', 'sass:watch']);

gulp.task('default', ['babel', 'sass', 'watch']);