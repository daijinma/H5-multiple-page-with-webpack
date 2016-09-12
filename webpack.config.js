var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD = path.resolve(ROOT_PATH, 'build');

var myPlugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common', // 将公共模块提取，生成名为`common`的chunk
        filename: "./js/common.js",
        minChunks: 2 // 提取所有entry共同依赖的模块
    }),
    //将样式统一发布到style.css中
    new ExtractTextPlugin("./asssets/style/[name].css", {
        allChunks: true,
        disable: false
    }),
    //报错 && 不中断
    new webpack.NoErrorsPlugin(),
    // new webpack.ProvidePlugin({
    //     "reset": path.resolve(
    //         __dirname,
    //         "src/asssets/style/reset.css"
    //     )
    // })
    new HtmlWebpackPlugin({
        filename: "./index.html", //生成的html存放路径，相对于path
        //favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        template: './src/index.html', //html模板路径
        // templateContent: function(templateParams, compilation) {
        //   // Return your template content synchronously here 
        //   return require('./src/view/'+i+'.html!html');
        // },
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        excludeChunks: ['dev-helper'],//不使用dev-helper作为注入文件
        //hash: true, //为静态资源生成hash值
        //chunks: ['common',i],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件    
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    })
];


module.exports = {
    cache: true,
    devtool: "source-map",
    entry: ['./src/app.js'],
    output: {
        /**
         * path          一定要绝对路径，不然报错
         * publicPath    是指注入到页面的路径名称
         * filename      文件名
        **/ 
        path: BUILD,// 这里最好定义输出根目录，起服务会以此为根目录
        publicPath: "", // 这里是指注入文件引用地址  eg. publicPath+filename
        filename: "./js/[name].js", //这里填写输出文件的地址
    },
    // resolve: {
    //     alias: {
    //         jquery: srcDir + "/js/lib/jquery.min.js"
    //     }
    // },
    externals: {
        jquery: 'window.$',
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            // {
            //     test: /\.less$/,
            //     include: srcDir,
            //     loader: ExtractTextPlugin.extract("style", "css!px2rem?remUnit=75&remPrecision=8!less")
            // },
            // css 自动补全前缀
            {
                test: /\.css$/,
                include: srcDir,
                loader: ExtractTextPlugin.extract("style", "css")
            }, {
                test: /\.vue$/,
                include: srcDir,
                loader: "vue-loader",
            }, {
                test: /\.(jpg|png|gif)\?_inline$/,
                include: srcDir,
                loader: "url-loader?limit=10000"
            }, {
                test: /\.(jpg|png|gif)$/,
                include: srcDir,
                loader: "file-loader?name=asssets/images/[name].[ext]"
            }, {
                test: /\.(html|tpl)$/,
                include: srcDir,
                loader: 'html-loader'
            }
        ]
    },
    plugins: myPlugins,
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js'],
        //别名
        alias: {}
    },
    //声明一个外部依赖
    externals: {
        jQuery: 'jQuery.noConflict()', //或者jquery:'jQuery'
        $: 'jQuery.noConflict()',
    }
};