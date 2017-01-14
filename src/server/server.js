import express from 'express'
import WebpackDevServer from 'webpack-dev-server'
import opn from 'opn'
import chalk from 'chalk'
import path from 'path'
import compiler from '../../config/compiler'
// Initialize Express
const app = express();

// Which environment are we working?
const env = app.get('env')
// app.use('/', express.static(path.resolve(__dirname, '..', '..', 'dist')))
// app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')))

// If no environment is specified, we'll assume its developments
if (env !== 'production') {

    // Fire up the Webpack Dev Server with HMR
    const devServer = new WebpackDevServer(compiler, {
        hot: true,
        quiet: true
    })

    app.use(devServer.middleware)

    devServer.listen(8080, () => {
        console.log(chalk.gray(`Webpack Dev Server started at ${8080}`))
    })

    app.get('*', (req, res, next) => {
        var react_app = req.originalUrl
        if (react_app === '/') {
            res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'))
        } else {
            var filename = path.resolve(compiler.outputPath, react_app, 'index.html');
            compiler.outputFileSystem.readFile(filename, function (err, result) {
                if (err) {
                    return next(err);
                }
                res.set('content-type', 'text/html');
                res.send(result);
                res.end();
            });
        }

    })

}

// Make our /dist folder static

app.listen(1234, () => {
    console.log('Started!')
})