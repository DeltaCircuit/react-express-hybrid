/* eslint-disable import/no-extraneous-dependencies, no-console */
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.prod');
const chalk = require('chalk');
const ncp = require('ncp').ncp;

process.env.NODE_ENV = 'production';

// Print out errors
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach((err) => {
    console.log(err.message || err);
    console.log();
  });
}

function copyPublicFolder() {
  ncp('./public', './dist', {
    filter(name) {
      return !name.includes('template');
    },
  }, (err) => {
    if (err) {
      console.log(err);
    }
  });
}


function build() {
  process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
  console.log(chalk.blue('Creating the optimized production build'));
  webpack(webpackConfig).run((error, stats) => {
    if (error) {
      printErrors('Failed to compile', [error]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      process.exit(1);
    }
    copyPublicFolder();
    console.log(chalk.green('Compiled successfully. Look at ./dist directory'));
  });
}


build();
