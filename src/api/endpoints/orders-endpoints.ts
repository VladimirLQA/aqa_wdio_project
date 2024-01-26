import { BaseEndpoints } from './base-endpoints.js';

class OrdersEndpoints extends BaseEndpoints {
  readonly orders = `api/orders/`;
  readonly orderById = (orderId: string) => `api/orders/${orderId}/`;
  readonly orderComment = 'api/orders/comments';
  readonly orderDelivery = 'api/orders/delivery/';
  readonly orderStatus = 'api/orders/status';
  readonly orderReceive = 'api/orders/receive';
}

export default new OrdersEndpoints();
