import type { CustomerStorageGeneric } from './abstract.storage';
import { Storage } from './abstract.storage';

class CustomersStorageNew extends Storage<CustomerStorageGeneric> {
  protected storage: CustomerStorageGeneric[] = [];

  protected addEntity(customer: CustomerStorageGeneric): void {
    const customerIndex = this.findEntityIndex(customer.email);
    customerIndex !== 1 ? this.updateEntity(customer, customer.email) : this.storage.push(customer);
  }

  protected updateEntity(updatedCustomer: CustomerStorageGeneric, customerEmail: string): void {
    const customerIndex = this.findEntityIndex(customerEmail);
    customerIndex !== -1 ? (this.storage[customerIndex] = updatedCustomer) : console.log('Customer was not found');
  }

  protected findEntityIndex(customerEmail: string): number {
    return this.storage.findIndex((customer) => customer.email === customerEmail);
  }

  // deleteEntity(customerEmail: string): void {
  //   const customerIndex = this.findEntityIndex(customerEmail);
  //   customerIndex !== -1 ? this.storage.splice(customerIndex, 1) : console.log('Customer was not found');
  // }

  // getAllEntities(): (ICustomer | ICustomerResponse)[] {
  //   return this.storage;
  // }

  // getEntity(customerEmail: string): ICustomerResponse | ICustomer | void {
  //   const customerIndex = this.findEntityIndex(customerEmail);
  //   return customerIndex !== -1 ? this.storage[customerIndex] : console.log(`Customer was not found`);
  // }
}

export default new CustomersStorageNew();
