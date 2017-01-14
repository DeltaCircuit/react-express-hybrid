const path = require('path');
const webpack = require('webpack');
const HtmlMultiplePlugin = require('./HtmlMultiplePlugin');
const getDevPaths = require('./GetEntryPoints').GetDevEntries;

module.exports = {
  context: __dirname,
  entry: getDevPaths(),
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
          'custom-loader',
        ],
        include: path.resolve(__dirname, '..', 'src', 'client'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  resolveLoader: {
    alias: {
      'custom-loader': path.join(__dirname, './hmr'),
    },
  },
  devServer: {
    hot: true,
        //quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlMultiplePlugin(),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'public', 'index.html')
        // })
  ],
};
