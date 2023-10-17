import type { RequestParams } from '../types/api-request.types';
import SignInActions from '../../ui/actions/sign-in.actions';

export const reqAsLoggedUser = async <T>(action: Function, params: RequestParams<T>) => {
  params.token = await SignInActions.getToken();
  const response = await action(params);
  return response;
};