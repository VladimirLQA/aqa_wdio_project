import { MANUFACTURERS } from '../../data/products/product.data';
import { Id } from '../../api/types/api-request.types';

interface IProduct {
  name: string;
  price: number;
  amount: number;
  manufacturer: string | MANUFACTURERS;
  notes?: string;
}

type IProductWithID = IProduct & Id;

type ToastMessage = 'created' | 'updated' | 'deleted' | 'already exist' | 'assigned to order';

export { IProduct, ToastMessage, IProductWithID };