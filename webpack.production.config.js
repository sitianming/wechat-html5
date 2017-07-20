const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = {
    entry : __dirname + '/src/js/main.js',
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8100&name=images/[hash:8].[name].[ext]'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'html-withimg-loader!' + path.resolve('src', 'index.html'),
            filename: 'index.html'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "public"),
        inline: true,
        // historyApiFallback: true,  //单页应用，使用路由功能时使用
    },
};

module.exports = config;
