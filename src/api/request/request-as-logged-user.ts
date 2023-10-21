import type { RequestParams } from '../types/api-request.types';
import SignInActions from '../../ui/actions/sign-in.actions';
import { AxiosResponse } from 'axios';

export const reqAsLoggedUser = async <T>(action: Function, params: RequestParams<T>) => {
  params.token = await SignInActions.getToken();
  const response = await action(params);
  return response;
};