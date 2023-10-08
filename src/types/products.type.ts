import { MANUFACTURERS } from '../data/products/product.data';

interface IProduct {
  name: string;
  price: number;
  amount: number;
  manufacturer: string | MANUFACTURERS;
  notes?: string;
}

type ToastMessage = 'created' | 'updated' | 'deleted' | 'already exist' | 'assigned to order';

type InputFieldsData = Pick<IProduct, 'price' | 'name' | 'amount'>;
type ProductInputs = Record<any, InputFieldsData[]>

export { IProduct, InputFieldsData, ProductInputs, ToastMessage };