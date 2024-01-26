import { CreatedChangedOn } from '../../ui/types/common.types.js';
import { ICustomer } from '../../ui/types/customers.types.js';

export interface ICustomerResponse extends ICustomer {
  _id: string;
  createdOn: CreatedChangedOn;
}
