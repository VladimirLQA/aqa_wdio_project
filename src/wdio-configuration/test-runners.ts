const mocha_spec = ['../tests/**/*.test.ts'];
const mocha_suites = {
  ui: ['../tests/ui_tests/**/*.test.ts'],
  api: ['../tests/api_tests/**/*.test.ts'],
  single: ['../tests/apii_tests/**/crud.products.test.ts'],
};
const cucumber_spec = ['../**/*.feature'];
const cucumber_suites = { ui: ['../ui/features/**/*.feature'] };

const test_runners: Record<string, {}> = {
  mocha: {
    specs: mocha_spec,
    suites: mocha_suites,
    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000,
    },
  },
  cucumber: {
    specs: cucumber_spec,
    suites: cucumber_suites,
    framework: 'cucumber',
    cucumberOpts: {
      // <string[]> (file/dir) require files before executing features
      require: ['./src/ui/action-definitions/**/*.actions.ts'],
      // <boolean> show full backtrace for errors
      backtrace: false,
      // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
      requireModule: [],
      // <boolean> invoke formatters without executing steps
      dryRun: false,
      // <boolean> abort the run on first failure
      failFast: false,
      // <boolean> hide step definition snippets for pending steps
      snippets: true,
      // <boolean> hide source uris
      source: true,
      // <boolean> fail if there are any undefined or pending steps
      strict: false,
      // <string> (expression) only execute the features or scenarios with tags matching the expression
      // tagExpression: "",
      tags: '',
      // <number> timeout for step definitions
      timeout: 60000,
      // <boolean> Enable this config to treat undefined definitions as warnings.
      ignoreUndefinedDefinitions: false,
    },
  },
};

export default test_runners[process.env.TEST_RUNNER || 'mocha'];
