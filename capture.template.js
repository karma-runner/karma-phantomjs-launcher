var system = require('system'),
fs = require('fs'),
webpage = require('webpage');

(function (phantom) {
  var page = webpage.create();

  function debugPage() {
    console.log('Launch the debugger page at http://localhost:9000/webkit/inspector/inspector.html?page=2');

    var debuggerWait = 15000;
    console.log('Waiting ' + (debuggerWait / 1000) + ' seconds for debugger page to launch...');

    var launchPage = function () {
      console.log('Launching page <%= url %>...');
      page.open('<%= url %>');
    };

    setTimeout(launchPage, 15000);
  }
  debugPage();
}(phantom));
