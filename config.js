'use strict';
var gutil = require('gulp-util');

exports.paths = {
	src: 'src',                      //开发环境
	dist: '_server',                    //预览环境
	build: 'build',                    //生产环境
	tmp:"static",                      //开发文件临时环境
	tmp:".tmp",                      //生产文件临时环境
	isPhone:false,						//手机版
	browsersPhone: [
	    'last 2 versions',
	    'Android >= 4.0',
	    "iOS 7",
	],
	browsersPC: [
        'last 2 versions',
        'ie >= 8',
    ]
}
exports.sftp = {
    host: '10.20.5.110',
    port: "22",
    auth:'keyMain',
    remotePath:'/data/htdocs/m.panda.tv/activity/'
}


/**
 *  Gulp组件错误处理
 */
exports.errorHandler = function(title) {
  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};