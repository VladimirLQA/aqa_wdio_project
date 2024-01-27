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

    // expect(actual.name).toBe(expected.name);
    // expect(actual.notes).toBe(expected.notes);
    // expect(actual.email).toBe(expected.email);
    // expect(actual.street).toBe(expected.street);
    // expect(actual.flat).toBe(expected.flat);
    // expect(actual.country).toBe(expected.country);
    // expect(actual.house).toBe(expected.house);
    // expect(actual.phone).toBe(expected.phone);
  }
}

export default new ApiCustomersAssertions();
