import { ICustomer } from '../../ui/types/customers.types';
import { CreatedChangedOn } from '../../ui/types/common.types';


export interface ICustomerResponse extends ICustomer {
  _id: string;
  createdOn: CreatedChangedOn;
}