/**
 Gulpfile for gulp-webpack-demo
 created by fwon
*/

var gulp = require('gulp'),
    path = require("path"),
    os = require('os'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create('mpandatv'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    spriter = require('gulp-css-spriter'),
    fs = require("fs"),
    base64 = require('gulp-css-base64'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    includeTag = require('gulp-include-tag'),
    runSequence = require('gulp-sequence'),
    px2rem = require('gulp-px2rem'),
    autoprefixer = require('gulp-autoprefixer');

var conf = require('./config');
var _distPath = conf.paths.dist;
var production = false;
var phone = conf.paths.isPhone;


/**
 * 生产环境构建
 */
gulp.task('build', function() {
    _distPath = conf.paths.build;
    console.log(_distPath);
    production = true;
    // build
    //gulp.start('clean');
    gulp.start('copy:images', 'html','scripts','styles').on('done',(function(cb){
        console.log("get in")
        gulp.start("base64")
        cb();
    })());
});


/**
 * 开发环境本地服务
 */
gulp.task('server', ['clean'], function() {

    var routes = {
            '/src': 'src',
            '/static': 'static',
    }

    browserSync.init({
        startPath: '/',
        server: {
            baseDir: [_distPath],
            routes: routes
        },
        browser: 'default',
        ghostMode: {
            clicks: true,
            scroll: true,
            forms: true
        },
        port: 80,
    });


    /**
     *  监听样式文件的变化
     */
    gulp.watch([
        path.join(conf.paths.src, '/asssets/style/**/*.css'),
        path.join(conf.paths.src, '/asssets/style/**/*.less')
    ], function(event) {
        gulp.start('copy:images','styles');
    });
    /**
     *  监听js文件的变化
     */
    gulp.watch([
        path.join(conf.paths.src, '/components/**/*'),
        path.join(conf.paths.src, '/js/**/*')
    ], function(event) {
        gulp.start('scripts');
        browserSync.reload({ stream: true });
    });

    /**
     *  监听HTML文件的变化
     */
    gulp.watch([
        path.join(conf.paths.src, '/*.html'),
        path.join(conf.paths.src, '/view/*'),
    ], ["html"]);

    gulp.start('copy:images', 'html','scripts', 'styles');

});


gulp.task('watch',['copy:images', 'html','scripts', 'styles'], function (done) {
    
});


//将图片拷贝到目标目录
gulp.task('copy:images', function (done) {
    return gulp.src(['src/asssets/images/**/*']).pipe(gulp.dest(_distPath+'/asssets/images')).on("done",done)
});

//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task('styles', function (done) {
    return gulp.src([
        path.join(conf.paths.src, '/asssets/style/*.css'),
        path.join(conf.paths.src, '/asssets/style/*.less')
    ])
    .pipe(less())
    .on('error', function(e){
        console.log("=====less 编译出错=====！");
        console.log(e);
    })
    .pipe(px2rem({
        rootValue:40,
        replace: false,
        propertyBlackList: ["border"],
    }))
    .on('error', function(e){
        console.log("=====px2rem 编译出错=====！");
        console.log(e);
    })
    .pipe(autoprefixer({
        browsers: conf.browsersPhone,
        cascade: true, //是否美化属性值 默认：true
        remove:true //是否去掉不必要的前缀 默认：true
    })).on('error', conf.errorHandler('Autoprefixer'))
    //这里可以加css sprite 让每一个css合并为一个雪碧图
    //.pipe(spriter({}))
    //.pipe(concat('style.min.css'))
    .pipe(gulp.dest(_distPath+'/asssets/style/'))
    .on('end', function(){
        console.log("编译css")
    });
});

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
// gulp.task('md5:js', ['build-js'], function (done) {
//     gulp.src('dist/js/*.js')
//         .pipe(md5(10, 'dist/app/*.html'))
//         .pipe(gulp.dest('dist/js'))
//         .on('end', done);
// });

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
// gulp.task('md5:css', ['sprite'], function (done) {
//     gulp.src('dist/style/*.css')
//         .pipe(md5(10, 'dist/app/*.html'))
//         .pipe(gulp.dest('dist/style'))
//         .on('end', done);
// });

//用于在html文件中直接include文件
gulp.task('html', function (done) {
    return gulp.src(['src/**/*.html','!./src/template/*.html'])
        .pipe(includeTag())
        .pipe(gulp.dest(path.join(_distPath)))
        .pipe(browserSync.reload({ stream: true }))
        .on("done",done)
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('base64', function (done) {
    var timestamp = +new Date();
    return gulp.src(_distPath+'/style/*.css')
        .pipe(base64())
        //.pipe(cssmin())
        .pipe(gulp.dest(_distPath+'/style'))
        .on("done",done)
        //.pipe(browserSync.reload({ stream: true }))
});

/*
 rem方案使用雪碧图position定位问题 暂时弃用
 */ 
// gulp.task('sprite', ['base64'], function (done) {

//     function getCssEntry() {
//         var cssPath = path.resolve(conf.paths.src, 'style');
//         var dirs = fs.readdirSync(cssPath);
//         var matchs = [], files = [];
//         //console.log('扫描入口文件...')
//         dirs.forEach(function (item) {
//             matchs = item.match(/(.+)\.css$/);
//             console.log(item);
//             if (matchs) {
//                 files.push(path.resolve(conf.paths.src, 'style', item));
//             }
//         });
//         return files;
//     };
//     console.log(getCssEntry());
//     getCssEntry().map(function(item,index){
//         var timestamp = +new Date();
//         console.log("css do "+item)
//         gulp.src(item)
//         .pipe(spriter({
//             spritesmithOptions: {
//                 padding: 10
//             }
//         }))
//         .pipe(gulp.dest(_distPath+'/style'))
//     });
// });


gulp.task('clean', function (done) {
    return gulp.src([_distPath])
        .pipe(clean())
        .on("done",done)
});



//引用webpack对js进行操作
gulp.task("scripts", function(callback) {

    //return 
    var webpackRelease = webpackConfig(_distPath);

    var myDevConfig = Object.create(webpackRelease);

    var devCompiler = webpack(myDevConfig);

    return devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        gulp.src(_distPath+'/js/*.js').pipe(browserSync.reload({ stream: true }));
        callback();
    });
});


//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
//gulp.task('styles', 'open']);

//发布
//gulp.task('default', ['connect', 'fileinclude', 'md5:css', 'md5:js', 'open']);

//gulp.task('dev', ['connect', 'copy:images', 'fileinclude', 'lessmin', 'build-js', 'watch', 'open']);
