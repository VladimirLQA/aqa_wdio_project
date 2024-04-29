import { ApiBaseAssertions } from './api-base.assertions.js';
import Expect from '../../utils/chai-expect/expect-collection.js';
import { IProductFromResponse } from '../../types/products.types.js';

class ApiProductsAssertions extends ApiBaseAssertions {
  verifyProduct(actual: IProductFromResponse, expected: Partial<IProductFromResponse>) {
    Expect.toEqual({ actual: actual.name, expected: expected.name });
    Expect.toEqual({ actual: actual.notes, expected: expected.notes });
    Expect.toEqual({ actual: actual.amount, expected: expected.amount });
    Expect.toEqual({ actual: actual.price, expected: expected.price });
    Expect.toEqual({ actual: actual.manufacturer, expected: expected.manufacturer });
  }
}

export default new ApiProductsAssertions();
