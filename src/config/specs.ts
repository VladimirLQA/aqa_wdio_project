const spec: Record<string, string[]> = {
  cucumber: ['../ui/features/**/*.feature'],
  mocha: ['../tests/ui_tests/**/smoke.orders.test.ts'],
};

export default spec[process.env.TEST_RUNNER || 'mocha'];