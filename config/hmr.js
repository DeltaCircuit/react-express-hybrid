const path = require('path');

function hmr(source) {
  const context = this;
  this.cacheable();
  let entryFile = [];
  const entry = this.options.entry;
  const customEntrypoint = this.options.entryPoint;

  if (this.options.customEntrypoint) {
    entryFile = customEntrypoint;
  } else {
    const entryType = Object.prototype.toString.call(entry);
    if (entryType === '[object Array]') {
      // Falling back to the last item in the entry array
      entryFile = entryType[entryType.length - 1];
    } else if (entryType === '[object Object]') {
      // Named entries.
      // There could be multiple named entries. So iterating that.
      Object.keys(entry).forEach((namedEntry) => {
        const namedEntryType = Object.prototype.toString.call(entry[namedEntry]);
        // Now this named entry either can be a single string or a string array
        if (namedEntryType === '[object String]') {
          entryFile.push(entry[namedEntry]);
        } else if (namedEntryType === '[object Array]') {
          // We take the last item from the named array entry
          entryFile.push(entry[namedEntry][entry[namedEntry].length - 1]);
        }
      });
    }
  }

  let isQualified;

  if (Object.prototype.toString.call(entryFile) === '[object String]') {
    isQualified = (path.resolve(entryFile) === context.resourcePath);
  } else if (Object.prototype.toString.call(entryFile) === '[object Array]') {
    isQualified = entryFile.some(item => context.resourcePath === require.resolve(item));
  }

  if (isQualified) {
    return `${source}\r\n\r\nif(module.hot){module.hot.accept()}`;
  }
  return source;
}

module.exports = hmr;
