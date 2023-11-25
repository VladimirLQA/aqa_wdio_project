import { Id } from '../../api/type/api-request.type';

export interface IProduct {
  name: string;
  price: number;
  amount: number;
  manufacturer: string | MANUFACTURERS;
  notes?: string;
}

export type IProductWithID = IProduct & Id;

export type ToastMessage = 'created' | 'updated' | 'deleted' | 'already exist' | 'assigned to order';

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