import { ContentType } from 'allure-js-commons';
import OrdersEndpoints from '../endpoints/orders-endpoints.js';
import Request from '../request/index-request.js';
import { Id, RequestOptions, RequestParams } from '../../types/api-request.type.js';
import {
  IOrdersRequest,
  ICommentRequest,
  IOrderDeliveryRequest,
  IOrderStatusRequest,
  IOrdersResponseData,
  IOrderResponseData,
} from '../../types/order.types.js';

class OrdersController {
  async get(params: RequestParams<Id>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderById(params.data._id),
      headers: { 'Content-Type': ContentType.JSON, Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async getAll(params: Partial<RequestParams<unknown>>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orders,
      headers: { 'Content-Type': ContentType.JSON, Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest<IOrdersResponseData>(options);
  }

  async createOrder(params: RequestParams<IOrdersRequest>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orders,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async updateOrder(params: RequestParams<IOrdersRequest>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orders,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async deleteOrder(params: Required<RequestParams<Id>>) {
    const options: RequestOptions = {
      method: 'DELETE',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderById(params.data._id),
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
    };
    return Request.sendRequest<null>(options);
  }

  async addComment(params: RequestParams<ICommentRequest>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderComment,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async deleteComment(params: RequestParams<ICommentRequest>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderComment,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async updateOrderStatus(params: RequestParams<IOrderStatusRequest>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderStatus,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async delivery(params: RequestParams<IOrderDeliveryRequest>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderDelivery,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async receive(params: RequestParams<Partial<IOrdersRequest>>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderReceive,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }
}

export default new OrdersController();
