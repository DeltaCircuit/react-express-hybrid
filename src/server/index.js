import express from 'express';
import opn from 'opn';
import chalk from 'chalk';
import path from 'path';
import webpackMiddleware from '../../config/WebpackDevServer';
// Initialize Express
const app = express();

// Which environment are we working?
const env = app.get('env');
if (env === 'production') {
  // eslint-disable-next-line no-console
  console.log(chalk.red('WARNING!!!: Running in Production mode.'));
  app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '..', '..', 'mem-dist')));
}

// If no environment is specified, we'll assume its development env
if (env !== 'production') {
  app.use(webpackMiddleware);
}

app.listen(1234, () => {
  // eslint-disable-next-line no-console
  console.log('Started!');
  opn('http://localhost:1234');
});
