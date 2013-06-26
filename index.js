var fs = require('fs');


var PhantomJSBrowser = function(baseBrowserDecorator, options) {
  baseBrowserDecorator(this);

  this._start = function(url) {
    // create the js file, that will open karma
    var captureFile = this._tempDir + '/capture.js';
    var optionsCode = Object.keys(options || {}).map(function (key) {
      return 'page.' + key + ' = ' + JSON.stringify(options[key]) + ';';
    });
    var captureCode = 'var page = new WebPage();' + optionsCode.join() + ' page.open("' + url + '");';
    fs.writeFileSync(captureFile, captureCode);

    // and start phantomjs
    this._execCommand(this._getCommand(), [captureFile]);
  };
};

PhantomJSBrowser.prototype = {
  name: 'PhantomJS',

  DEFAULT_CMD: {
    linux: require('phantomjs').path,
    darwin: require('phantomjs').path,
    win32: require('phantomjs').path
  },
  ENV_CMD: 'PHANTOMJS_BIN'
};

PhantomJSBrowser.$inject = ['baseBrowserDecorator', 'config.runnerOptions'];


// PUBLISH DI MODULE
module.exports = {
  'launcher:PhantomJS': ['type', PhantomJSBrowser]
};
