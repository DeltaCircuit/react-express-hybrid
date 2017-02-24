/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


function HelloWorldPlugin() {

}

function applier(compiler) {
  const webpackEntry = compiler.options.entry;
  const entryType = Object.prototype.toString.call(webpackEntry);
  if (entryType === '[object Object]') {
    Object.keys(compiler.options.entry).forEach((entry) => {      
      let hwb = new HtmlWebpackPlugin({
        chunks: [entry],
        title: entry,
        chunksSortMode: 'none',
        filename: `${entry}/index.html`,
        template: path.resolve(__dirname, '..', 'public', 'template.html'),
      });
      hwb.apply(compiler);
      hwb = null;
    });
  } else if (entryType === '[object Array]') {
    const hwb = new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'template.html'),
    });
    hwb.apply(compiler);
  }
}


HelloWorldPlugin.prototype.apply = applier;
module.exports = HelloWorldPlugin;
