// Karma configuration
// Generated on Sat Mar 25 2023 20:20:50 GMT-0500 (hora estándar de Colombia)

module.exports = function (config) {
  var chromeFlags = [
    '--headless', '--remote-debugging-port=9222', '--no-sandbox'
  ];
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'requirejs', '@angular-devkit/build-angular'],
    files: [
      'test-main.js'
    ],
    preprocessors: {
      'test-main.js': ['webpack', 'sourcemap']
    },
    webpack: {},
    webpackMiddleware: {
      stats: 'errors-only'
    },
    client: {
      clearContext: false,
      jasmine: {
        timeoutInterval: 60000,
        random: false
      },
      captureConsole: true,
      mocha: {
        bail: true
      }
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browserNoActivityTimeout: 20000,
    browsers: ['CustomChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
    customLaunchers: {
      CustomChrome: {
        base: "Chrome",
        flags: chromeFlags
      },
      CustomChromeHeadless: {
        base: "ChromeHeadless",
        flags: chromeFlags
      }
    }
  });
};
