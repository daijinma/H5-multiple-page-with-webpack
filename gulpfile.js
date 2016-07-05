'use strict';

var gulp = require("gulp");
var path = require('path');
var browserSync = require('browser-sync').create('uhouzz');
var $ = require('gulp-load-plugins')(); // 统一加载其他文件
var minifyCss = require('gulp-minify-css');
//var modRewrite = require('connect-modrewrite');
var RevAll = require('gulp-rev-all');
var filter = require('gulp-filter');
var includeTag = require('gulp-include-tag');
var gulpif = require('gulp-if');
var minCss = require('gulp-mini-css');
var px2rem = require('gulp-px2rem');
var scanning = require('./scanning.js');

var conf = require('./config');
var _distPath = conf.paths.dist;
var production = false;
var phone = conf.isPhone;
var revAll = new RevAll();


/**
 * 生产环境构建
 */
gulp.task('build', function() {
    _distPath = conf.paths.build;
    production = true;
    // build
    gulp.start('scripts', 'styles',"html");
});


/**
 * 开发环境本地服务
 */
gulp.task('server', ['clean','watch'], function() {
    var routes = {
            '/src': 'src',
            '/static': 'static',
    }
    var exts = new RegExp("\.(html|js|css|less|png|jpg|video|mp3|mp4|jpeg|gif|json)$");

    browserSync.init({
        startPath: '/',
        server: {
	        baseDir: [_distPath],
	        routes: routes
	    },
        browser: 'default',
        // ghostMode: {
        //     clicks: false,
        //     scroll: false,
        //     forms: false
        // },
        port: 80,
    });
});



gulp.task('watch', ['scripts', 'styles',"html"], function() {
    /**
     *  监听样式文件的变化
     */
    gulp.watch([
        path.join(conf.paths.src, '/css/*.css'),
        path.join(conf.paths.src, '/css/*.less')
    ], function(event) {
        gulp.start('styles');
    });
    /**
     *  监听js文件的变化
     */
    gulp.watch(path.join(conf.paths.src, '/**/*.js'), function(event) {
        gulp.start('scripts');
    });

    /**
     *  监听HTML文件的变化
     */
    gulp.watch([
        path.join(conf.paths.src, '/index.html'),
        path.join(conf.paths.src, '/**/*.html'),
    ], ["html",'reload']);
});

gulp.task("clean",function(){
	return gulp.src([
		path.join(_distPath,"**/*"),
	])
    .pipe($.clean());
})





gulp.task('scripts', ['handlebars','lib'], function () {


    return gulp.src(path.join(conf.paths.src, '/js/*.js'))
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.browserify())
        .pipe($.size())
        .pipe(gulpif(production,$.uglify()))
        .pipe(gulp.dest(path.join(_distPath,"/js/")))
        .pipe(browserSync.reload({ stream: true }))
});
gulp.task('handlebars', function () {

    return gulp.src(path.join(conf.paths.src, '/tpl/*.hbs'))
        .pipe($.handlebars({
          handlebars: require('handlebars')
        }))
        .pipe($.wrap('Handlebars.template(<%= contents %>)'))
        .pipe($.declare({
          namespace: 'MyApp.templates',
          noRedeclare: true // Avoid duplicate declarations
        }))
        //.pipe($.handlebars())
        //.pipe(nodeModuleifyHbs())
        .pipe($.concat('templates.js'))
        .pipe(gulp.dest(path.join(conf.paths.src,"/tpl/")))
        //.pipe(browserSync.reload({ stream: true }))
});
gulp.task('lib', function () {
    return gulp.src(path.join(conf.paths.src, '/lib/*.js'))
        .pipe(gulp.dest(path.join(_distPath,"/lib/")));
});


gulp.task('html', function () {
    

    return gulp.src(path.join(conf.paths.src, '/*.html'))
        .pipe(includeTag())
    	.pipe(gulp.dest(path.join(_distPath)))
        .pipe(browserSync.reload({ stream: true }))
        
});

gulp.task('html2',['html'], function () {
    

    return gulp.src(path.join(conf.paths.build, '/*.html'))
        .pipe(scanning())
        .pipe(gulp.dest(path.join(conf.paths.build)))
        //.pipe(browserSync.reload({ stream: true }))
        
});


gulp.task('styles',["image"], function() {

	return gulp.src(path.join(conf.paths.src, 'style/*.less'))
        //.pipe($.sourcemaps.init())
        .pipe($.less()).on('error', conf.errorHandler('Less'))
        .pipe(gulpif(phone,px2rem({
            rootValue:40,
            replace: false,
            propertyBlackList: ["border"],
        })))
        .pipe($.autoprefixer({
            browsers: conf.browsersPhone,
            cascade: true, //是否美化属性值 默认：true 
            remove:true //是否去掉不必要的前缀 默认：true 
        })).on('error', conf.errorHandler('Autoprefixer'))
        //.pipe($.sourcemaps.write())
        //.pipe(gulpif(production,minCss()))
        .pipe(gulp.dest(path.join(_distPath, 'style/')))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('image', function() {

	return gulp.src(path.join(conf.paths.src, '/**/*.{jpg,png,jpeg,gif}'))
		.pipe(gulp.dest(path.join(_distPath)))
});

gulp.task('reload', function() {
    browserSync.reload();
})


gulp.task('test', function() {
    gulp.start("html2");
})
