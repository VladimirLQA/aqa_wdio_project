import { RequestOptions, RequestParams } from '../../types/api-request.types';
import { IUserCredentials } from '../../types/user.types';
import { URLS } from '../endpoints';
import Request from '../request/request';

class SignInController {
  async login(params: RequestParams<IUserCredentials>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: URLS.baseURL,
      url: URLS.endpoints.login,
      headers: {'Content-Type': 'application/json'},
      data: params.data,
    };
    return Request.sendRequest(options);
  }
}

export default new SignInController();