//
// Test runner services
// Services take over a specific job you don't want to take care of. They enhance
// your test setup with almost no effort. Unlike plugins, they don't add new
// commands. Instead, they hook themselves up into the test process.
// services: [],
//
// Framework you want to run your specs with.
// The following are supported: Mocha, Jasmine, and Cucumber
// see also: https://webdriver.io/docs/frameworks
//
// Make sure you have the wdio adapter package for the specific framework installed
// before running any tests.
const test_runners = {
  mocha: {
    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000,
    },
  },
  cucumber: {
    framework: 'cucumber',
    cucumberOpts: {
      require: ['../ui/action-definitions/**/*.ts'],
      timeout: 60000,
    },
  },
};

export default test_runners[process.env.TEST_RUNNER || 'mocha'];