const path = require('path');
const webpack = require('webpack');
const HtmlMultiplePlugin = require('./HtmlMultiplePlugin');
const getEntries = require('./GetEntryPoints');

module.exports = {
  entry: getEntries('development'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'static/js/[name]/bundle.js',
    publicPath: 'http://localhost:1234/',
  },

  module: {
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
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
  devServer: {
    hot: true,
    //quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlMultiplePlugin(),
  ],
};
