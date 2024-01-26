import type { IProduct } from '../../ui/types/products.types.js';
import { CreatedChangedOn } from '../../ui/types/common.types.js';

export interface IProductResponse extends IProduct {
  _id: string;
  createdOn: CreatedChangedOn;
}
