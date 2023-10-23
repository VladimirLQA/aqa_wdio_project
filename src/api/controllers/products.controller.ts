import Request from '../request/request';
import { Id, RequestOptions, RequestParams } from '../types/api-request.types';
import { URLS } from '../endpoints';
import { IProduct } from '../../ui/types/products.types';

class ProductsController {
  public async get(params: RequestParams<Id>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: URLS.baseURL,
      url: params.data ? URLS.endpoints.productByID(params.data._id) : URLS.endpoints.products,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest(options);
  }

  public async create(params: RequestParams<IProduct>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: URLS.baseURL,
      url: URLS.endpoints.products,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  public async update(params: RequestParams<IProduct>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: URLS.baseURL,
      url: URLS.endpoints.products,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  public async delete(params: Required<RequestParams<Id>>) {
    const options: RequestOptions = {
      method: 'DELETE',
      baseURL: URLS.baseURL,
      url: URLS.endpoints.productByID(params.data._id),
      headers: { Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest(options);
  }
}

export default new ProductsController();