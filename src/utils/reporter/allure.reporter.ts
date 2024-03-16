import allure from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Logger from '../logger/logger.js';
import Utils from '../helpers.js';

export function logAction(stepName: string): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (this: any, ...args: any[]) {
      const selector = args[0]; // Extract the selector from the arguments
      const value = args[1]; // Extract the value from the arguments

      let newStepName = stepName
        .replace('{selector}', `"${Utils.getElementSelector(selector)}"`)
        .replace('{text}', `"${value}"`)
        .replace('{attribute}', `"${value}"`)
        .replace('{script}', `"${selector}"`)
        .replace('{optionSelector}', `"${Utils.getStringInDoubleQuotes(value)}"`)
        .replace('{cssProperty}', `"${value}"`);

      allure.startStep(newStepName);
      try {
        const result = await originalMethod.apply(this, args);
        allure.endStep();
        return result;
      } catch (error) {
        allure.endStep(Status.FAILED);
        throw error;
      }
    };
    return descriptor;
  };
}

export function attachLog(log: string) {
  allure.addAttachment('Test log', log, 'text/plain');
}

export function attachScreenshot(screenshot: string) {
  allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
}

export function logApiActions(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const options: AxiosRequestConfig = args[0];

    allure.startStep(`Request: ${options.method!.toUpperCase()} ${options.url}`);
    allure.addAttachment(
      `Request headers`,
      JSON.stringify(options.headers, null, 2),
      'application/json',
    );
    allure.addAttachment(`Request body`, JSON.stringify(options.data, null, 2), 'application/json');
    allure.endStep();

    Logger.logApiRequest(JSON.stringify(options, null, 2));

    try {
      const response: AxiosResponse = await originalMethod.apply(this, args);

      allure.startStep(`Response: ${response.status} ${response.config.url}`);
      allure.addAttachment(
        `Response headers`,
        JSON.stringify(response.headers, null, 2),
        'application/json',
      );
      allure.addAttachment(
        `Response body`,
        JSON.stringify(response.data, null, 2),
        'application/json',
      );
      allure.endStep(response.status >= 400 ? Status.FAILED : Status.PASSED);

      Logger.logApiResponse(
        JSON.stringify({ status: response.status, body: response.data }, null, 2),
      );

      return response;
    } catch (error) {
      allure.endStep(Status.FAILED);

      throw error;
    }
  };
  return descriptor;
}
