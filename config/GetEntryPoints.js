const path = require('path');
const fs = require('fs');

// NOTE: THE WEBPACK CONFIG FILE AND THIS MODULE MUST LIVE IN THE SAME DIRECTORY

// Method to generate entry points for webpack for development enviroment (HMR) included

const appSourceDir = path.resolve(process.cwd(), 'src', 'client');
const reactModules = fs.readdirSync(appSourceDir).filter(file =>
  fs.statSync(path.join(appSourceDir, file)).isDirectory(),
);
const webPackHotLibs = ['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server'];

module.exports = function getEntryPoints(env) {
  const entry = Object.create(null);
  const devLib = env === 'prod' ? [] : webPackHotLibs;


  // No sub modules
  if (reactModules.length === 0) {
    const indexPath = path.normalize(path.join(appSourceDir, 'index.js'));
    const entryArray = devLib.concat(indexPath);
    entry.main = entryArray;
    return entry;
  }

  // One or more sub modules present
  reactModules.forEach((module) => {
    const indexPath = path.normalize(path.join(appSourceDir, module, 'index.js'));
    const entryArray = devLib.concat(indexPath);
    entry[module] = entryArray;
  });
  return entry;
};
