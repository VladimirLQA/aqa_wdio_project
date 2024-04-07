export type RequestOptions<Data = object> = {
  method: Method;
  baseURL: string;
  requestType?: 'json' | 'formData';
  url?: string;
  params?: Record<string, string | readonly string[]>;
  headers?: Record<string, string | number | boolean>;
  data?: Data;
  timeout?: number;
};

type Method = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestParams<T> {
  data: T;
  token?: string;
}

export type Id = {
  readonly _id: string;
};

export interface IResponse<T = any> {
  data: T;
  status: string;
  headers: Record<string, string | number | boolean>;
}

export interface ResponseFields {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}
