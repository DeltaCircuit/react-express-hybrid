/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
// import WebpackDevServer from 'webpack-dev-server';
// import opn from 'opn';
import chalk from 'chalk';
import path from 'path';
import compiler from '../../config/compiler';
import webpackMiddleware from '../../config/WebpackDevServer';
// Initialize Express
const app = express();

// Which environment are we working?
const env = app.get('env');
if (env === 'production') {
  // eslint-disable-next-line no-console
  console.log(chalk.red('WARNING!!!: Running in Production mode.'));
  app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')));
}
app.use(express.static(path.resolve(__dirname, '..', '..', 'dist', 'static')));
// If no environment is specified, we'll assume its development env
if (env !== 'production') {
  app.use(webpackMiddleware);
}
app.get('/[a-z 0-9]+/', (req, res, next) => {
  const filename = path.resolve(compiler.outputPath, req.originalUrl, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
    return 1;
  });
});
// Make our /dist folder static

app.listen(1234, () => {
  // eslint-disable-next-line no-console
  console.log('Started!');
});
