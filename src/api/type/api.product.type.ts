import type { IProduct } from '../../ui/types/products.types';
import { CreatedChangedOn } from '../../ui/types/common.types';

export interface IProductResponse extends IProduct {
  _id: string;
  createdOn: CreatedChangedOn;
}
