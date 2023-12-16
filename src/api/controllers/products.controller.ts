import { IProduct, IProductWithID } from '../../ui/types/products.types';
import ProductsEndpoints from '../endpoints/products-endpoints';
import Request from '../request/request';
import { Id, RequestOptions, RequestParams } from '../type/api-request.type';

class ProductsController {
  public async get(params: RequestParams<Id>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: ProductsEndpoints.baseURL,
      url: params.data ? ProductsEndpoints.productByID(params.data._id) : ProductsEndpoints.products,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest(options);
  }

  public async create(params: RequestParams<IProduct>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: ProductsEndpoints.baseURL,
      url: ProductsEndpoints.products,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  public async update(params: Required<RequestParams<IProductWithID>>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: ProductsEndpoints.baseURL,
      url: ProductsEndpoints.products,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  public async delete(params: Required<RequestParams<Id>>) {
    const options: RequestOptions = {
      method: 'DELETE',
      baseURL: ProductsEndpoints.baseURL,
      url: ProductsEndpoints.productByID(params.data._id),
      headers: { Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest(options);
  }
}

export default new ProductsController();
