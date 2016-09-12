'use strict'

var path = require("path");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var BUILD = path.resolve(__dirname, 'build');

config.entry.unshift('webpack-dev-server/client?http://127.0.0.1:80', "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());


//启动服务
var app = new WebpackDevServer(webpack(config), {
    historyApiFallback: true,
    hot: true,
    stats: { 
        colors: true  // 用颜色标识
    },
    inline: true,
    progress: true,
});

app.listen(80);


