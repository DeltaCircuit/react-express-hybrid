const path = require('path');
const webpack = require('webpack');
const HtmlMultiplePlugin = require('./HtmlMultiplePlugin');
const getEntries = require('./GetEntryPoints');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssFilename = 'static/css/[name].[contenthash:8].css';

module.exports = {
  entry: getEntries('production'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'static/js/[name]/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
        ],
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        include: path.resolve(__dirname, '..', 'src', 'client'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin(cssFilename),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
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
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
};
