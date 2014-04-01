var fs = require('fs');
var path = require('path');


function serializeOption(value) {
  if (typeof value === 'function') {
    return value.toString();
  }
  return JSON.stringify(value);
}

var win32PhantomJSPath = function () {
  // get the path stored in phantomjs\lib\location.js, someting like
  //   "C:\\Users\\user-name\\AppData\\Roaming\\npm\\phantomjs.CMD"
  var cmd = require('phantomjs').path;

  // get the global npm install directory by removing the filename from cmd variable
  var npmGlobalRoot = path.dirname(cmd);

  // add known path
  var phantom = npmGlobalRoot + '\\node_modules\\phantomjs\\bin\\phantomjs';

  return phantom;
};

var PhantomJSBrowser = function(baseBrowserDecorator, config, args) {
  baseBrowserDecorator(this);

  var options = args && args.options || config && config.options || {};
  var flags = args && args.flags || config && config.flags || [];

  this._start = function(url) {
    // create the js file that will open karma
    var captureFile = this._tempDir + '/capture.js';
    var optionsCode = Object.keys(options).map(function (key) {
      if (key !== 'settings') { // settings cannot be overriden, it should be extended!
        return 'page.' + key + ' = ' + serializeOption(options[key]) + ';';
      }
    });

    if (options.settings) {
      optionsCode = optionsCode.concat(Object.keys(options.settings).map(function (key) {
        return 'page.settings.' + key + ' = ' + serializeOption(options.settings[key]) + ';';
      }));
    }

    var captureCode = 'var page = require("webpage").create();\n' +
        optionsCode.join('\n') + '\npage.open("' + url + '");\n';
    fs.writeFileSync(captureFile, captureCode);

    var isWin = /^win/.test(process.platform);
    if (isWin) {
      flags = flags.concat(win32PhantomJSPath(), captureFile);
    } else {
      flags = flags.concat(captureFile);
    }

    // and start phantomjs
    this._execCommand(this._getCommand(), flags);
  };
};

PhantomJSBrowser.prototype = {
  name: 'PhantomJS',

  DEFAULT_CMD: {
    linux: require('phantomjs').path,
    darwin: require('phantomjs').path,
    win32: process.execPath //path to node.exe, see flags in _start()
  },
  ENV_CMD: 'PHANTOMJS_BIN'
};

PhantomJSBrowser.$inject = ['baseBrowserDecorator', 'config.phantomjsLauncher', 'args'];


// PUBLISH DI MODULE
module.exports = {
  'launcher:PhantomJS': ['type', PhantomJSBrowser]
};
