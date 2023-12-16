import { ICustomerResponse } from '../../api/type/api.customers.type';
import { ICustomer } from '../../ui/types/customers.types';
import { Storage } from './abstract.storage';

class CustomersStorage extends Storage<ICustomerResponse & ICustomer> {
  protected storage: (ICustomer & ICustomerResponse)[] = [];

  addEntity(customer: ICustomer & ICustomerResponse): void {
    const customerIndex = this.findEntityIndex(customer.email);
    customerIndex !== -1 ? this.updateEntity(customer, customer.email) : this.storage.push(customer);
  }

  updateEntity(updatedCustomer: ICustomer & ICustomerResponse, customerEmail: string): void {
    const customerIndex = this.findEntityIndex(customerEmail);
    customerIndex !== -1 ? (this.storage[customerIndex] = updatedCustomer) : console.log('Customer was not found');
  }

  deleteEntity(customerEmail: string): void {
    const customerIndex = this.findEntityIndex(customerEmail);
    customerIndex !== -1 ? this.storage.splice(customerIndex, 1) : console.log('Customer was not found');
  }

  getAllEntities() {
    return this.storage;
  }

  getEntity(customerEmail: string) {
    const customerIndex = this.findEntityIndex(customerEmail);
    return customerIndex !== -1 ? this.storage[customerIndex] : this.storage.at(-1);
  }

  protected findEntityIndex(customerEmail: string): number {
    return this.storage.findIndex((customer) => customer.email === customerEmail);
  }
}

export default new CustomersStorage();
