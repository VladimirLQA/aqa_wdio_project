import { MANUFACTURERS } from '../../data/products/product.data';
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
