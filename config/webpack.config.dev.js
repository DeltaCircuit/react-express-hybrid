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
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],

      },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader',
          'hot-module-accept',
        ],
        include: path.resolve(__dirname, '..', 'src', 'client'),
        exclude: /node_modules/,
      },
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
        test: /\.svg$/,
        loader: 'file-loader',
      },
    ],
  },
  devServer: {
    hot: true,
    //quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlMultiplePlugin(),
  ],
};
