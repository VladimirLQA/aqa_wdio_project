import { IUserCredentials } from '../../ui/types/user.types';
import SignInEndpoints from '../endpoints/base-endpoints';
import Request from '../request/request';
import { RequestOptions, RequestParams } from '../type/api-request.type';

class SignInController {
  async login(params: RequestParams<IUserCredentials>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: SignInEndpoints.baseURL,
      url: SignInEndpoints.login,
      headers: { 'Content-Type': 'application/json' },
      data: params.data,
    };
    return Request.sendRequest(options);
  }
}

export default new SignInController();
