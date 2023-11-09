const spec = {
  cucumber: ['../ui/features/**/*.feature'],
  mocha: ['../tests/ui_tests/**/*.test.ts'],
};

export default spec[process.env.TEST_RUNNER || 'mocha'];