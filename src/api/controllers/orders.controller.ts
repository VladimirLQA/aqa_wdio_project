import { ContentType } from 'allure-js-commons';
import OrdersEndpoints from '../endpoints/orders-endpoints.js';
import Request from '../request/request.js';
import { Id, RequestOptions, RequestParams } from '../type/api-request.type.js';
import {
  IApiCommentRequest,
  IApiOrderDeliveryRequest,
  IApiOrderStatusRequest,
  IApiOrdersRequest,
} from '../type/api.orders.type.js';

class OrdersController {
  async get(params: RequestParams<Id>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: OrdersEndpoints.baseURL,
      url: params.data ? OrdersEndpoints.orderById(params.data._id) : OrdersEndpoints.orders,
      headers: { 'Content-Type': ContentType.JSON, Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest(options);
  }

  async createOrder(params: RequestParams<IApiOrdersRequest>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orders,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async updateOrder(params: RequestParams<IApiOrdersRequest>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orders,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async deleteOrder(params: Required<RequestParams<Id>>) {
    const options: RequestOptions = {
      method: 'DELETE',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderById(params.data._id),
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
    };
    return Request.sendRequest(options);
  }

  async addComment(params: RequestParams<IApiCommentRequest>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderComment,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async deleteComment(params: RequestParams<IApiCommentRequest>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderComment,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async updateOrderStatus(params: RequestParams<IApiOrderStatusRequest>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderStatus,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async delivery(params: RequestParams<IApiOrderDeliveryRequest>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderDelivery,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async receive(params: RequestParams<Partial<IApiOrdersRequest>>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderReceive,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest(options);
  }
}

export default new OrdersController();
