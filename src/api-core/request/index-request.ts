import { AbstractRequest } from './abstract-request.js';
import AxiosRequest from './axios-request.js';

const request: Record<string, AbstractRequest> = {
  axios: AxiosRequest,
};

export default request[process.env.API_CLIENT || 'axios'];
