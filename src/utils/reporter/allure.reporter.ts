import allure from '@wdio/allure-reporter';
import type { RequestParams } from '../../api/types/api-request.types';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Status } from 'allure-js-commons';
// TODO implement to business logic and correct errors with methods
export function logAction(stepName: string): MethodDecorator {
  return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {

      const selector = args[0]; // Extract the selector from the arguments
      const value = args[1]; // Extract the value from the arguments

      let newStepName = stepName
        .replace('{selector}', `"${selector}"`)
        .replace('{text}', `"${value}"`);

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