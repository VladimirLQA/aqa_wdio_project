import { COUNTRIES } from '../../data/customers/customers.data';

export interface ICustomer {
  email: string;
  country: string | COUNTRIES;
  street: string;
  flat: number;
  notes: string;
  name: string;
  city: string;
  house: number;
  phone: string;
}