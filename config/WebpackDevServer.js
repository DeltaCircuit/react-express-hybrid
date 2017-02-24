/* eslint-disable import/no-extraneous-dependencies */
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const compiler = require('./compiler');

const devServer = new WebpackDevServer(compiler, {
  hot: true,
  quiet: true,
});
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log(chalk.green('Starting in Development mode.'));
  devServer.listen(8080, () => {
    // eslint-disable-next-line no-console
    console.log(chalk.gray(`Webpack Dev Server started at ${8080}`));
  });
}
module.exports = devServer.middleware;
