import { CreatedChangedOn } from '../../ui/types/common.types';
import { ICustomer } from '../../ui/types/customers.types';

export interface ICustomerResponse extends ICustomer {
  _id: string;
  createdOn: CreatedChangedOn;
}

export type CombinedCustomerType = ICustomerResponse & ICustomer;
