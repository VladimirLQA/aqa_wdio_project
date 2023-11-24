import type { RequestParams } from '../type/api-request.type';
import ApiSignInActions from '../api_actions/api-sign-in.actions';

export const reqAsLoggedUser = async <T>(action: Function, params: RequestParams<T>) => {
  params.token = await ApiSignInActions.signInAsAdminAndGetToken();
  const response = await action(params);
  return response;
};