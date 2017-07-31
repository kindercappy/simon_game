var gulp = require('gulp'),
	gutil = require('gulp-util'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var sassSources,
		outPutDir,
		htmlSources,
		jsSources;

sassSources = ['development/styles/*.scss'];
outPutDir = 'development/';
htmlSources = 'development/*.html';
jsSources = ['development/script/*.js'];

gulp.task('compass',function(){
	gulp.src(sassSources)
	.pipe(compass({
		sass:'development/styles/',
		image: 'development/images/',
		style:'expanded'
	}))
	.on('error',gutil.log)
	.pipe(gulp.dest('development/styles/'))
	.pipe(connect.reload())
});

gulp.task('connect',function(){
	connect.server({
		root: outPutDir,
		livereload:true
	});
});

gulp.task('html',function(){
	gulp.src(htmlSources)
		.pipe(connect.reload())
});

gulp.task('js',function(){
	gulp.src(jsSources)
		.pipe(connect.reload())
});

gulp.task('watch',function(){
	gulp.watch('development/styles/*.scss',['compass']);
	gulp.watch(htmlSources,['html']);
	gulp.watch(jsSources,['js']);
});

gulp.task('default',['compass','watch','connect','js']);