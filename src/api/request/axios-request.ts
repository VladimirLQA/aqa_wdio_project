import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import { AbstractRequest } from './abstract-request.js';
import FormData from 'form-data';
import loggerService from '../../utils/logger/index-logger.js';
import reportService from '../../utils/reporter/index-reporter.js';

class AxiosRequest extends AbstractRequest {
  protected async send() {
    const request = axios.create();
    return await request(this.options as AxiosRequestConfig);
  }

  protected transformRequest(): void {
    if (this.options?.requestType === 'formData') {
      const formData = new FormData();

      if (!this.options.data) {
        throw new Error('Request body was not provided');
      }

      for (const key in this.options.data) {
        // @ts-ignore
        formData.append(key, this.options.data[key]);
      }

      this.options.headers!['Content-Type'] = `multipart/form-data; boundary=${formData.getBoundary()}`;
      this.options.data = formData;
    }
  }

  protected transformResponse(error: any): void {
    if (isAxiosError(error)) {
      this.response = {
        data: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      };
    }
    this.response = {
      data: this.response?.data,
      status: this.response?.status,
      headers: this.response?.headers,
    };
  }
}

export default new AxiosRequest(reportService, loggerService);
