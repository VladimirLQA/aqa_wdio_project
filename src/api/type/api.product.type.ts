import type { IProduct } from '../../ui/types/products.types';

export interface IProductResponse extends IProduct {
  _id: string;
  createdOn: string;
}
