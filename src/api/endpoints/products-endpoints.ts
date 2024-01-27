import { BaseEndpoints } from './base-endpoints.js';

class ProductsEndpoints extends BaseEndpoints {
  readonly products = `api/products/`;
  readonly productByID = (id: string) => `api/products/${id}/`;
}

export default new ProductsEndpoints();
