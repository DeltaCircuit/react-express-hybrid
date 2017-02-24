const path = require('path');
const webpack = require('webpack');
const HtmlMultiplePlugin = require('./HtmlMultiplePlugin');
const getEntries = require('./GetEntryPoints');

module.exports = {
  entry: getEntries('production'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name]/[name]-[hash].js',
    publicPath: 'http://localhost:1234/',
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel',
          'hot-module-accept',
        ],
        include: path.resolve(__dirname, '..', 'src', 'client'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.svg$/,
        loader: 'file',
      },
    ],
  },
  plugins: [
        // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
        // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlMultiplePlugin({ production: true }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'public', 'index.html')
        // })
  ],
};
