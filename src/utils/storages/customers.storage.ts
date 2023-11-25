import { ICustomerResponse } from '../../api/type/api.customers.type';

export class CustomersStorage {
  private static instance: CustomersStorage;
  public static customers: ICustomerResponse[] = [];

  constructor() {
    if (CustomersStorage.instance) {
      return CustomersStorage.instance;
    }
    CustomersStorage.instance = this;
  }

  static addCustomer<T>(customer: T): void {
    const customerIndex = this.findCustomerIndexByEmail(customer.email);
    customerIndex !== -1
      ? this.updateCustomer(customer, customer.email)
      : this.customers.push(customer);
  }

  static updateCustomer(customer: ICustomerResponse, customerEmail: string): void {
    const customerIndex = this.findCustomerIndexByEmail(customerEmail);
    customerIndex !== -1
      ? this.customers[customerIndex] = customer
      : console.log('Customer not found');
  }

  static getCustomer(customerEmail: string) {
    const customerIndex = this.findCustomerIndexByEmail(customerEmail);
    return customerIndex !== -1
      ? this.customers[customerIndex]
      : console.log('Customer not found');

  }

  static getAllCustomers(): ICustomerResponse[] {
    return this.customers;
  }

  static deleteCustomer(customerEmail: string) {
    const customerIndex = this.findCustomerIndexByEmail(customerEmail);
    customerIndex !== -1
      ? this.customers.splice(customerIndex, 1)
      : console.log('Customer not found');
  }

  private static findCustomerIndexByEmail(customerEmail: string): number {
    return this.customers.findIndex((customer) => customer.email === customerEmail);
  }
}
