// 说明：如果你的项目拥有多个html文件，请使用此配置文件内容替换webpack.config.js，并修改相应配置：entry和 plugins

const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: {
        // 各个页面的入口js文件，以下只是示例，修改完这里后，记得同时修改29行，34行
        main2:'./src/js/main2.js',
        main3:'./src/js/main3.js'
    },
    output: {
        path:__dirname+'/public',
        publicPath: '',
        filename:'js/[name].js?[hash]',
        devtoolModuleFilenameTemplate : info => {
            return `${info.resourcePath}?id=${info.id}&hash=${info.hash}`;
        }
    },
    module: {
        noParse: /jquery|lodash|swiper/,
        rules: [
        ]
    },
    devtool: 'eval-source-map',
    plugins:[
        new htmlWebpackPlugin({
            template: __dirname+'/src/index2.html',
            filename: __dirname+'/public/index2-build.html',
            chunks: ['main2','common']
        }),
        new htmlWebpackPlugin({
            template: __dirname+'/src/index3.html',
            filename: __dirname+'/public/index3-build.html',
            chunks: ['main3','common']
        }),
        // 提取出公共的js，减小代码体积
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/common.js?[hash]'
        })
    ]
};
