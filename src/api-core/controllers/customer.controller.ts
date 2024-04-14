import { ICustomer, ICustomerResponseData, ICustomersResponseData } from '../../types/customers.types.js';
import CustomerEndpoints from '../endpoints/customer-endpoints.js';
import Request from '../request/index-request.js';
import { Id, RequestOptions, RequestParams } from '../../types/api-request.type.js';

class CustomersController {
  async get(params: RequestParams<Id>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: CustomerEndpoints.baseURL,
      url: CustomerEndpoints.customerById(params.data._id),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest<ICustomerResponseData>(options);
  }

  async getAll(params: Partial<RequestParams<Id>>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: CustomerEndpoints.baseURL,
      url: CustomerEndpoints.customers,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest<ICustomersResponseData>(options);
  }

  async create(params: RequestParams<ICustomer>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: CustomerEndpoints.baseURL,
      url: CustomerEndpoints.customers,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return Request.sendRequest<ICustomerResponseData>(options);
  }

  async update(params: RequestParams<ICustomer>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: CustomerEndpoints.baseURL,
      url: CustomerEndpoints.customers,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return Request.sendRequest<ICustomerResponseData>(options);
  }

  async delete(params: Required<RequestParams<Id>>) {
    const options: RequestOptions = {
      method: 'DELETE',
      baseURL: CustomerEndpoints.baseURL,
      url: CustomerEndpoints.customerById(params.data._id),
      headers: { Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest<null>(options);
  }
}

export default new CustomersController();
