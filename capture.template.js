;(function (phantom) {
  var page = require('webpage').create();

  <% if (exitOnResourceError) { %>
  page.onResourceError = function() {
    phantom.exit(1)
  }
  <% } %>

  <% _.forOwn(pageOptions, function(value, key) { %>
  page.<%= key %> = <%= value %>
  <% }) %>

  <% _.forOwn(pageSettingsOptions, function(value, key) { %>
  page.settings.<%= key %> = <%= value %>
  <% }) %>

  page.onConsoleMessage = function () {
      console.log.apply(console, arguments)
  }

  page.onError = function(msg, trace) {

    var msgStack = ['ERROR: ' + msg];

    if (trace && trace.length) {
      msgStack.push('TRACE:');
      trace.forEach(function(t) {
        msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
      });
    }

    console.error(msgStack.join('\n'));

  }

  <% if (debug) { %>
  function debugPage() {
    console.log('Launch the debugger page at http://localhost:9000/webkit/inspector/inspector.html?page=2')

    var debuggerWait = 15000
    console.log('Waiting ' + (debuggerWait / 1000) + ' seconds for debugger page to launch...')

    var launchPage = function () {
      console.log('Launching page <%= url %>...')
      page.open('<%= url %>')
    }

    setTimeout(launchPage, 15000)
  }
  debugPage()
  <% } else { %>
  page.open('<%= url %>')
  <% } %>
}(phantom))
