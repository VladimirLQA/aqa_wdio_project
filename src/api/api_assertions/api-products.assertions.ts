import { ApiBaseAssertions } from './api-base.assertions';
import { IProductResponse } from '../types/api.product.types';


class ApiProductsAssertions extends ApiBaseAssertions {
  async verifyProduct(actual: IProductResponse, expected: Partial<IProductResponse>) {
    expect(actual.name).toBe(expected.name);
    expect(actual.notes).toBe(expected.notes);
    expect(actual.amount).toBe(expected.amount);
    expect(actual.price).toBe(expected.price);
    expect(actual.manufacturer).toBe(expected.manufacturer);
  }
}

export default new ApiProductsAssertions();