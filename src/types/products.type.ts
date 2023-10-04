import { MANUFACTURER } from '../data/products/product.data';

interface IProduct {
  name: string;
  price: number;
  amount: number;
  manufacturer: string | MANUFACTURER;
  notes?: string;
}

type InputFieldsData = Pick<IProduct, 'price' | 'name' | 'amount'>;
type ProductInputs = Record<any, InputFieldsData[]>

export { IProduct, InputFieldsData, ProductInputs };