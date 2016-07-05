'use strict';
var gutil = require('gulp-util');

exports.paths = {
	src: 'src',                      //开发环境
	dist: 'dist',                    //预览环境
	browsers: [
	    'last 2 versions',
	    'Android >= 4.0',
	    "iOS 7",
	]

}

/**
 *  Gulp组件错误处理
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};