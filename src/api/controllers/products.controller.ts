import ProductsEndpoints from '../endpoints/products-endpoints.js';
import Request from '../request/index-request.js';
import { Id, RequestOptions, RequestParams } from '../../types/api-request.type.js';
import { IProduct, IProductFromResponse, IProductResponseData, IProductsResponseData } from '../../types/products.types.js';

class ProductsController {
  public async get(params: RequestParams<Id>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: ProductsEndpoints.baseURL,
      url: ProductsEndpoints.productByID(params.data._id),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest<IProductResponseData>(options);
  }

  async getAll(params: Partial<RequestParams<Id>>) {
    const options: RequestOptions = {
      baseURL: ProductsEndpoints.baseURL,
      url: ProductsEndpoints.products,
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.token}` },
      requestType: 'json',
    };
    return Request.sendRequest<IProductsResponseData>(options);
  }

  public async create(params: RequestParams<IProduct>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: ProductsEndpoints.baseURL,
      url: ProductsEndpoints.products,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return Request.sendRequest<IProductResponseData>(options);
  }

  public async update(params: RequestParams<IProductFromResponse>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: ProductsEndpoints.baseURL,
      url: ProductsEndpoints.products,
      headers: { Authorization: `Bearer ${params.token}` },
      data: params.data,
    };
    return Request.sendRequest<IProductResponseData>(options);
  }

  public async delete(params: RequestParams<Id>) {
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
