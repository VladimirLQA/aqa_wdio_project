import type { RequestParams } from '../../types/api-request.type.js';
import ApiSignInActions from '../api_actions/api-sign-in.actions.js';

export const reqAsLoggedUser = async <T>(action: Function, params: RequestParams<T>) => {
  params.token = await ApiSignInActions.signInAsAdminAndGetToken();
  const response = await action(params);
  return response;
};
