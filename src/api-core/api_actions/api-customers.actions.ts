import CustomerController from '../controllers/customer.controller.js';
import { ICustomer } from '../../types/customers.types.js';
import { generateCustomer } from '../../data/customers/customers.data.js';
import { reqAsLoggedUser } from '../request/request-as-logged-user.js';
import { IAddress } from '../../types/order.types.js';

class ApiCustomersActions {
  async createCustomer(token: string, customer: ICustomer) {
    try {
      const response = await CustomerController.create({ token, data: customer });
      return response;
    } catch (error: any) {
      throw new Error('Error during creating customer');
    }
  }

  async getAllCustomers(token: string) {
    try {
      const response = await CustomerController.getAll({ token });
      return response;
    } catch (error) {
      throw new Error('Error while getting all customers');
    }
  }

  async deleteCustomer(token: string, id: string) {
    try {
      const response = await CustomerController.delete({ token, data: { _id: id } });
      return response;
    } catch (error) {
      throw new Error('Error while deleting customer');
    }
  }

  async updateCustomer(token: string, id: string, newCustomer?: Partial<ICustomer>) {
    try {
      const { email, country, street, notes, flat, phone, name, city, house } = (await this.getCustomerByID(token, id)).data.Customer;
      const updatedCustomer = {
        _id: id,
        email,
        country,
        street,
        notes,
        flat,
        phone,
        name,
        city,
        house,
        ...newCustomer,
      };

      const response = await CustomerController.update({ token, data: updatedCustomer });
      return response;
    } catch (error) {
      throw new Error('Error while updating customer');
    }
  }

  async getCustomerByID(token: string, id: string) {
    try {
      const response = await CustomerController.get({ token, data: { _id: id } });
      return response;
    } catch (error) {
      throw new Error('Error while getting customer by id');
    }
  }

  async getCustomerAddress(token: string, id: string): Promise<IAddress> {
    try {
      const customer = (await this.getCustomerByID(token, id)).data.Customer;
      return {
        flat: customer.flat,
        city: customer.city,
        country: customer.country,
        street: customer.street,
        house: customer.house,
      };
    } catch (error) {
      throw new Error('Error while getting customer address');
    }
  }

  async createCustomers(count: number) {
    const customers = [];
    for (let i = 1; i <= count; i++) {
      const customer = generateCustomer();
      customers.push((await reqAsLoggedUser(CustomerController.create, { data: customer })).data.Customer);
    }
    return customers;
  }
}

export default new ApiCustomersActions();
