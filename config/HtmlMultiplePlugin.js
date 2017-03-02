/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let hwpOptions = {
  chunksSortMode: 'none',
  template: path.resolve(__dirname, '..', 'public', 'template.html'),
};

function HelloWorldPlugin(options) {
  if (options && options.production) {
    hwpOptions = Object.assign({
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }, hwpOptions);
  }
}

function applier(compiler) {
  const webpackEntry = compiler.options.entry;
  const entryType = Object.prototype.toString.call(webpackEntry);
  if (entryType === '[object Object]') {
    Object.keys(compiler.options.entry).forEach((entry) => {
      const test = Object.assign({
        chunks: [entry],
        title: entry,
        filename: entry == 'index' ? 'index.html' : `${entry}/index.html`,
      }, hwpOptions);
      let hwb = new HtmlWebpackPlugin(test);
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
