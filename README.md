# karma-phantomjs-launcher

> Launcher for [PhantomJS].

## Installation

The easiest way is to keep `karma-phantomjs-launcher` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-phantomjs-launcher": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-phantomjs-launcher --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS', 'PhantomJS_custom'],

    // you can define custom flags
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }
  });
};
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers PhantomJS_custom
```

If you set the `debug` option to `true`, you will be instructed to launch a web browser to
bring up the debugger. Note that you will want to put `debugger;` statements in your JavaScript
to hit breakpoints. You should be able to put breakpoints in both your test code and your client
code. Note that the `debug` option automatically adds the `--remote-debugger-port=9000` and
`--remote-debugger-autorun=yes` switches to PhantomJS.

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
[PhantomJS]: http://phantomjs.org/
