import { ApiBaseAssertions } from './api-base.assertions.js';
import { IProductResponse } from '../type/api.product.type.js';
import Expect from '../../utils/chai-expect/expect-collection.js';

class ApiProductsAssertions extends ApiBaseAssertions {
  verifyProduct(actual: IProductResponse, expected: Partial<IProductResponse>) {
    Expect.toEqual({ actual: actual.name, expected: expected.name });
    Expect.toEqual({ actual: actual.notes, expected: expected.notes });
    Expect.toEqual({ actual: actual.amount, expected: expected.amount });
    Expect.toEqual({ actual: actual.price, expected: expected.price });
    Expect.toEqual({ actual: actual.manufacturer, expected: expected.manufacturer });

    // expect(actual.name).toBe(expected.name);
    // expect(actual.notes).toBe(expected.notes);
    // expect(actual.amount).toBe(expected.amount);
    // expect(actual.price).toBe(expected.price);
    // expect(actual.manufacturer).toBe(expected.manufacturer);
  }
}

export default new ApiProductsAssertions();
