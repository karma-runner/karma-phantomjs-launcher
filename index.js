var fs = require('fs');


var PhantomJSBrowser = function(baseBrowserDecorator) {
  baseBrowserDecorator(this);

  this._start = function(url) {
    // create the js file, that will open testacular
    var captureFile = this._tempDir + '/capture.js';
    var captureCode = '(new WebPage()).open("' + url + '");';
    fs.writeFileSync(captureFile, captureCode);

    // and start phantomjs
    this._execCommand(this._getCommand(), [captureFile]);
  };
};

PhantomJSBrowser.prototype = {
  name: 'PhantomJS',

  DEFAULT_CMD: {
    linux: 'phantomjs',
    darwin: '/usr/local/bin/phantomjs',
    win32: process.env.ProgramFiles + '\\PhantomJS\\phantomjs.exe'
  },
  ENV_CMD: 'PHANTOMJS_BIN'
};

PhantomJSBrowser.$inject = ['baseBrowserDecorator'];


// PUBLISH DI MODULE
module.exports = {
  'launcher:PhantomJS': ['type', PhantomJSBrowser]
};
