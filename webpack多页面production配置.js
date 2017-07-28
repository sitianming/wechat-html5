/* 说明：
    如果使用webpack多页面.js，
    将配置完成的webpack多页面.js复制到本页，
    删除devtool项，
    在plugin里最后位置添加new webpack.optimize.UglifyJsPlugin()
    复制当前配置，覆盖webpack.production.config.js

    以下配置，仅供参考
*/

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
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
