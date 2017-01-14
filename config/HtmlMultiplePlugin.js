/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function HelloWorldPlugin() {

}

function applier(compiler) {
  Object.keys(compiler.options.entry).forEach((entry) => {
    let hwb = new HtmlWebpackPlugin({
      chunks: ['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server', entry],
      title: entry,
      chunksSortMode: 'none',
      filename: `${entry}/index.html`,
      template: path.resolve(__dirname, '..', 'public', 'template.html'),
    });
    hwb.apply(compiler);
    hwb = null;
  });
}


HelloWorldPlugin.prototype.apply = applier;
module.exports = HelloWorldPlugin;
