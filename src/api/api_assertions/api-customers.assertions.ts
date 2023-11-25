import { ApiBaseAssertions } from './api-base.assertions';
import { IProductResponse } from '../type/api.product.type';
import { ICustomerResponse } from '../type/api.customers.type';


class ApiCustomersAssertions extends ApiBaseAssertions {
  async verifyCustomer(actual: ICustomerResponse, expected: Partial<ICustomerResponse>) {
    expect(actual.name).toBe(expected.name);
    expect(actual.notes).toBe(expected.notes);
    expect(actual.email).toBe(expected.email);
    expect(actual.street).toBe(expected.street);
    expect(actual.flat).toBe(expected.flat);
    expect(actual.country).toBe(expected.country);
    expect(actual.house).toBe(expected.house);
    expect(actual.phone).toBe(expected.phone);
  }
}

export default new ApiCustomersAssertions();