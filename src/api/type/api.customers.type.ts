import { ICustomer } from '../../ui/types/customers.types';


export interface ICustomerResponse extends ICustomer {
  _id: string;
  createdOn: string;
}