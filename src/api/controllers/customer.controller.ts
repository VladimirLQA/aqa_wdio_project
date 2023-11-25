import Request from '../request/request';
import { Id, RequestOptions, RequestParams } from '../type/api-request.type';
import CustomerEndpoints from '../endpoints/customer-endpoints';
import { ICustomer } from '../../ui/types/customers.types';

class CustomersController {
  async get(params: RequestParams<Id>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: CustomerEndpoints.baseURL,
      url: params.data ? CustomerEndpoints.customerById(params.data._id) : CustomerEndpoints.customers,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest(options);
  }

  async create(params: RequestParams<ICustomer>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: CustomerEndpoints.baseURL,
      url: CustomerEndpoints.customers,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async update(params: RequestParams<ICustomer>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: CustomerEndpoints.baseURL,
      url: CustomerEndpoints.customers,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async delete(params: Required<RequestParams<Id>>) {
    const options: RequestOptions = {
      method: 'DELETE',
      baseURL: CustomerEndpoints.baseURL,
      url: CustomerEndpoints.customerById(params.data._id),
      headers: { Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest(options);
  }
}

export default new CustomersController();