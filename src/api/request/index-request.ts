import { AbstractRequest } from './abstract-request';
import AxiosRequest from './axios-request';

const request: Record<string, AbstractRequest> = {
  axios: AxiosRequest,
};

export default request[process.env.API_CLIENT || 'axios'];
