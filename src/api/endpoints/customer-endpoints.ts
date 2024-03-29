import { BaseEndpoints } from './base-endpoints.js';

class CustomerEndpoints extends BaseEndpoints {
  readonly customers = 'api/customers';

  readonly customerById = (customerId: string) => `api/customers/${customerId}/`;
}

export default new CustomerEndpoints();
