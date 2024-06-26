import { Id, ResponseFields } from './api-request.type.js';

export interface IProduct {
  name: string;
  price: number;
  amount: number;
  manufacturer: string | MANUFACTURERS;
  notes?: string;
}

export type IProductWithID = IProduct & Id;

export type ProductToastMessage = 'created' | 'updated' | 'deleted' | 'already exist' | 'assigned to order';

export enum MANUFACTURERS {
  APPLE = 'Apple',
  SAMSUNG = 'Samsung',
  GOOGLE = 'Google',
  MICROSOFT = 'Microsoft',
  SONY = 'Sony',
  XIAOMI = 'Xiaomi',
  AMAZON = 'Amazon',
  TESLA = 'Tesla',
}

export const manufacturersArray = [
  MANUFACTURERS.GOOGLE,
  MANUFACTURERS.TESLA,
  MANUFACTURERS.MICROSOFT,
  MANUFACTURERS.APPLE,
  MANUFACTURERS.SAMSUNG,
  MANUFACTURERS.SONY,
  MANUFACTURERS.XIAOMI,
  MANUFACTURERS.AMAZON,
];

export interface IProductFromResponse extends IProduct {
  _id: string;
  createdOn?: string;
}

export interface IProductResponseData extends ResponseFields {
  Product: IProductFromResponse;
}

export interface IProductsResponseData extends ResponseFields {
  Products: IProductFromResponse[];
}
