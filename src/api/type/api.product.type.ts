import type { IProduct } from '../../ui/types/products.types';

interface IProductResponse extends IProduct {
  _id: string;
  createdOn: string;
}

export { IProductResponse };