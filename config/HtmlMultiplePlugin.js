var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var fs = require('fs')

function HelloWorldPlugin(options) {

}

HelloWorldPlugin.prototype.apply = function (compiler) {
    Object.keys(compiler.options.entry).forEach(function (entry) {
        var hwb = new HtmlWebpackPlugin({
            chunks: ['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server', entry],
            title: entry,
            chunksSortMode: 'none',
            filename: entry + '/index.html',
            template: path.resolve(__dirname, '..', 'public', 'template.html')
        })
        hwb.apply(compiler)
        hwb = null
    })
}

module.exports = HelloWorldPlugin
