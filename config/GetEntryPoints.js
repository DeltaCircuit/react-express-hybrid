var path = require('path')
var fs = require('fs')

// NOTE: THE WEBPACK CONFIG FILE AND THIS MODULE MUST LIVE IN THE SAME DIRECTORY

// Method to generate entry points for webpack for development enviroment (HMR) included

var appSourceDir = path.resolve(__dirname, '..', 'src', 'client')

var getDevEntryPoints = function () {
    var entry = Object.create(null)

    var reactModules = fs.readdirSync(appSourceDir).filter(function (file) {
        return fs.statSync(path.join(appSourceDir, file)).isDirectory()
    })

    // No sub modules
    if (reactModules.length == 0) {
        var indexPath = path.normalize(path.relative(__dirname, path.join(appSourceDir, 'index.js')))
        var entryArray = ['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server'].concat(indexPath)
        entry.main = entryArray
        return entry
    }

    // One or more sub modules present
    reactModules.forEach(function (module) {
        var indexPath = path.normalize(path.relative(__dirname, path.join(appSourceDir, module, 'index.js')))
        console.log(indexPath)
        var entryArray = ['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server'].concat(indexPath)
        entry[module] = entryArray
    })
    return entry


}

module.exports = {
    GetDevEntries: getDevEntryPoints
}
