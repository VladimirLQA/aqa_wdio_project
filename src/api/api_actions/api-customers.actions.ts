import CustomerController from '../controllers/customer.controller';
import { ICustomer } from '../../ui/types/customers.types';


// TODO: finish with this class + api smoke tests
class ApiProductsActions {
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
        _id: id, email, country, street, notes, flat, phone, name, city, house, ...newCustomer,
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
}

export default new ApiProductsActions();
