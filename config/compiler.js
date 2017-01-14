import webpack from 'webpack'
import devConfig from './webpack.config.dev'
import chalk from 'chalk'

const compiler = webpack(devConfig)

compiler.plugin('invalid', function () {
    //process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
    console.log(chalk.cyan('Compiling.. Please wait'))
})

compiler.plugin('done', function (stats) {
    //process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
    if (stats.hasErrors()) {
        console.log(chalk.red('Errors found!'))
        var formattedStats = stats.toJson("errors-only")
        formattedStats.errors.forEach(function (item) {
            console.log(item)
        })
        return
    }
    console.log(chalk.green('Compiled!\n'))
    console.log(chalk.magenta(`Please visit http://localhost:1234`))
    return
})

module.exports = compiler