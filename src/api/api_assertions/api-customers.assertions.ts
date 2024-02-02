import { ApiBaseAssertions } from './api-base.assertions.js';
import { ICustomerResponse } from '../type/api.customers.type.js';
import Expect from '../../utils/chai-expect/expect-collection.js';

class ApiCustomersAssertions extends ApiBaseAssertions {
  verifyCustomer(actual: ICustomerResponse, expected: Partial<ICustomerResponse>) {
    Expect.toEqual({ actual: actual.name, expected: expected.name });
    Expect.toEqual({ actual: actual.notes, expected: expected.notes });
    Expect.toEqual({ actual: actual.email, expected: expected.email });
    Expect.toEqual({ actual: actual.street, expected: expected.street });
    Expect.toEqual({ actual: actual.flat, expected: expected.flat });
    Expect.toEqual({ actual: actual.country, expected: expected.country });
    Expect.toEqual({ actual: actual.house, expected: expected.house });
    Expect.toEqual({ actual: actual.phone, expected: expected.phone });
  }
}

export default new ApiCustomersAssertions();
