import { BaseReporter } from './abstract-reporter.js';
import allure from './allure-reporter.js';

const reportServices: Record<string, BaseReporter> = {
  allure,
};

export default reportServices[process.env.REPORTER || 'allure'];
