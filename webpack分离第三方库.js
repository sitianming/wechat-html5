const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: {
        main2:'./src/js/main2.js',
        vender:['jquery','lodash','./src/lib/oauth.min.js','./src/lib/third/swiper.min.js']
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
            chunks: ['main2','vender']
        }),
        // 提取出公共的js，减小代码体积
        new webpack.optimize.CommonsChunkPlugin({
            name:'vender',
            filename:'js/vender.js?[hash]'
        })
    ]
};
