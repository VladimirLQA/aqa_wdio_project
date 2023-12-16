import CustomerController from '../controllers/customer.controller';
import { ICustomer } from '../../ui/types/customers.types';
import { getNewCustomer } from '../../data/customers/customers.data';
import { reqAsLoggedUser } from '../request/request-as-logged-user';
import CustomerStorage from '../../utils/storages/customers.storage';

class ApiCustomersActions {
  async createCustomer(token: string, customer: ICustomer) {
    try {
      const response = await CustomerController.create({ token, data: customer });
      return response;
    } catch (error: any) {
      throw new Error('Error during creating customer');
    }
  }

  async getAllPrCustomers(token: string) {
    try {
      const response = await CustomerController.get({ token });
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

  async createCustomers(count: number) {
    for (let i = 1; i <= count; i++) {
      const customer = getNewCustomer();
      CustomerStorage.addEntity<ICustomer>((await reqAsLoggedUser(CustomerController.create, { data: customer })).data.Customer);
    }
    return CustomerStorage;
  }
}

export default new ApiCustomersActions();
