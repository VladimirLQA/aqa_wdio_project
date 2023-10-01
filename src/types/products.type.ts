import { MANUFACTURER } from '../data/products/product.data';

export interface IProduct {
  name: string;
  price: number;
  amount: number;
  manufacturer: string | MANUFACTURER;
  notes?: string;
}
