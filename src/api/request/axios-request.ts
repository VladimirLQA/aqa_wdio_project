import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestOptions } from '../../types/api-request.type.js';
import { logApiActions } from '../../utils/reporter/allure.reporter.js';
import { AbstractRequest } from './abstract-request.js';
import FormData from 'form-data';

export type Response<T = any> = Promise<AxiosResponse<T>>;

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

  protected transformResponse(): void {
    const transformeResponse = {
      data: this.response.data,
      status: this.response.status,
      headers: this.response.headers,
    };
    this.response = transformeResponse;
  }
}

export default new AxiosRequest(reportService, loggerService);
