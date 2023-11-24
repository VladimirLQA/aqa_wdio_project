import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestOptions } from '../type/api-request.type';
import { logApiActions } from '../../utils/reporter/allure.reporter';

export type Response<T = any> = Promise<AxiosResponse<T>>;

const request = axios.create();
let response: AxiosResponse;

class Request {
  @logApiActions
  async sendRequest(options: RequestOptions): Response {
    try {
      response = await request(options as AxiosRequestConfig);
      return response;
    } catch (error: any) {
      console.log('Error', error.isAxiosError ? error.message : error);
      console.log('Request URL:', options.method, options.url);
      return error.response;
    }
  }
}

export default new Request();
