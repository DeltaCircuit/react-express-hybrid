/* eslint-disable import/no-extraneous-dependencies, no-console */
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const compiler = require('./compiler');

const devServer = new WebpackDevServer(compiler, {
  hot: true,
  quiet: true,
});
if (process.env.NODE_ENV !== 'production') {
  console.log(chalk.green('Starting in Development mode.'));
  devServer.listen(8080, () => {
    console.log(chalk.gray(`Webpack Dev Server started at ${8080}`));
  });
}
module.exports = devServer.middleware;
