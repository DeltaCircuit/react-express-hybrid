/* eslint-disable import/no-extraneous-dependencies, no-console */
const webpack = require('webpack');
const chalk = require('chalk');
const devConfig = require('./webpack.config.dev');
const fs = require('fs');
const path = require('path');

const isLogEnabled = process.env.NODE_ENV ? process.env.NODE_ENV !== 'production' : true;
const compiler = webpack(devConfig);
compiler.plugin('invalid', () => {
  if (isLogEnabled) {
    process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
    console.log(chalk.cyan('Compiling.. Please wait'));
  }
});

compiler.plugin('done', (stats) => {
  if (isLogEnabled) {
    process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
    if (stats.hasErrors()) {
      console.log(chalk.red('Errors found!'));
      const formattedStats = stats.toJson('errors-only');
      formattedStats.errors.forEach((item) => {
        console.log(item);
      });
      return;
    }
    const distPath = path.join(process.cwd(), 'dist');
    fs.readdir(distPath, (error, files) => {
      if (files) {
        console.log(chalk.red('The dist directory is not empty.\nWhat you are seeing is an old already built production build. Please delete the dist folder and restart'));
      }
    });
    console.log(chalk.green('Compiled!\n'));
    console.log(chalk.magenta('Please visit http://localhost:1234'));
  }
});

module.exports = compiler;
