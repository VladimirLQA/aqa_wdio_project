import type { RequestParams } from '../../types/api-request.type.js';
import ApiSignInActions from '../api_actions/api-sign-in.actions.js';
import { UsersToken } from '../../utils/storages/index-storages.js';

export const reqAsLoggedUser = async <T>(action: Function, params: RequestParams<T>) => {
  params.token = UsersToken.getToken() ?? await ApiSignInActions.signInAsAdminAndGetToken();
  const response = await action(params);
  return response;
};
