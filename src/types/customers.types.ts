import { ResponseFields } from './api-request.type';

export interface ICustomer {
  email: string;
  country: string | COUNTRIES;
  street: string;
  flat: number;
  notes: string;
  name: string;
  city: string;
  house: number;
  phone: string;
}

export enum COUNTRIES {
  USA = 'USA',
  BELARUS = 'Belarus',
  GERMANY = 'Germany',
  GREAT_BRITAIN = 'Great Britain',
  CANADA = 'Canada',
  UKRAINE = 'Ukraine',
  FRANCE = 'France',
  RUSSIA = 'Russia',
}

export interface ICustomerResponse extends ICustomer {
  _id: string;
  createdOn: string;
}

export interface ICustomerResponseData extends ResponseFields {
  Customer: ICustomerResponse;
}

export interface ICustomersResponseData extends ResponseFields {
  Customers: ICustomerResponse[];
}
