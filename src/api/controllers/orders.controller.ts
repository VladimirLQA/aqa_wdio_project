import Request from '../request/request';
import { Id, RequestOptions, RequestParams } from '../type/api-request.type';
import { IOrder } from '../../ui/types/order.types';
import OrdersEndpoints from '../endpoints/orders-endpoints';
import { IApiCommentRequest, IApiOrdersRequest } from '../type/api.orders.type';

class OrdersController {
  async getOrder(params: RequestParams<Id>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: OrdersEndpoints.baseURL,
      url: params.data ? OrdersEndpoints.orderById(params.data._id) : OrdersEndpoints.orders,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest(options);
  }

  async createOrder(params: RequestParams<IApiOrdersRequest>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orders,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': 'application/json' },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async updateOrder(params: RequestParams<IOrder>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orders,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': 'application/json' },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async deleteOrder(params: Required<RequestParams<Id>>) {
    const options: RequestOptions = {
      method: 'DELETE',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderById(params.data._id),
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': 'application/json' },
    };
    return Request.sendRequest(options);
  }

  async addComment(params: RequestParams<IApiCommentRequest>) {
    const options: RequestOptions = {
      method: 'DELETE',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderComment,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': 'application/json' },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  // update status order
}

export default new OrdersController();
