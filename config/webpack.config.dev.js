var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlMultiplePlugin = require('./HtmlMultiplePlugin')
module.exports = {
    //context: __dirname,
    entry: {
        "welcome": ['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server', './src/client/welcome/index.js'],
        "moduletwo": ['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server', './src/client/moduletwo/index.js'],
    },

    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name]/[name]-[hash].js',
        publicPath: 'http://localhost:1234/'
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel',
                    'custom-loader'
                ],
                include: path.resolve(__dirname, '..', 'src', 'client'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    resolveLoader: {
        alias: {
            "custom-loader": path.join(__dirname, "./hmr")
        }
    },
    devServer: {
        hot: true,
        //quiet: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlMultiplePlugin()
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'public', 'index.html')
        // })
    ]
}