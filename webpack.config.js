const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = {
    entry : __dirname + '/src/js/main.js',
    output: {
        path: __dirname + '/public',
        filename: "bundle.js",
        publicPath: ''
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
                // loader: 'url-loader?limit=1&name=images/[hash:8].[name].[ext]'
                loader: 'url-loader?limit=1&name=images/[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg|woff)$/,
                loader: 'url-loader?limit=1&name=assets/[hash:8].[name].[ext]'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'html-withimg-loader!' + path.resolve('src', 'index.html'),
            filename: 'index.html',
            inject: 'head',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "public"),
        inline: true,
        // historyApiFallback: true,  //单页应用，使用路由功能时使用
    },
    devtool: 'eval-source-map',
};

module.exports = config;
