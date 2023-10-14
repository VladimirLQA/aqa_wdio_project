import type { IProduct } from '../../ui/types/products.type';

interface IProductResponse extends IProduct {
  _id: string;
  createdOn: string;
}

export { IProductResponse };