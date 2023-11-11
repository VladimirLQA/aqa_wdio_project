import { RequestOptions, RequestParams } from '../types/api-request.types';
import { IUserCredentials } from '../../ui/types/user.types';
import Request from '../request/request';
import SignInEndpoints from '../endpoints/base-endpoints'

class SignInController {
  async login(params: RequestParams<IUserCredentials>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: SignInEndpoints.baseURL,
      url: SignInEndpoints.login,
      headers: {'Content-Type': 'application/json'},
      data: params.data,
    };
    return Request.sendRequest(options);
  }
}

export default new SignInController();