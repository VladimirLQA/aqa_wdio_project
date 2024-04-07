import { rimraf } from 'rimraf';
import { BaseReporter } from './abstract-reporter.js';
import allure from '@wdio/allure-reporter';

class AllureReporter extends BaseReporter {
  protected async reportApiRequestData() {
    allure.startStep(`Request: [${this.requestOptions?.method?.toUpperCase()}] [${this.requestOptions?.url}]`);
    allure.addAttachment('Request Headers', JSON.stringify(this.requestOptions?.headers, null, 2), 'application/json');
    allure.addAttachment('Request Body', this.requestOptions?.data ? JSON.stringify(this.requestOptions?.data, null, 2) : '{}', 'application/json');
  }

  protected async reportApiResponseData() {
    allure.startStep(`Response: Status - [${this.response?.status}] [${this.requestOptions?.url}]`);
    allure.addAttachment('Response Headers', JSON.stringify(this.response?.headers, null, 2), 'application/json');
    allure.addAttachment('Response Body', JSON.stringify(this.response?.data, null, 2), 'application/json');
  }

  attachLog(log: string) {
    allure.addAttachment('Test Log', log, 'text/plain');
  }

  clearReportResults() {
    rimraf.sync('../src/report/allure-results');
  }
}

export default new AllureReporter();
