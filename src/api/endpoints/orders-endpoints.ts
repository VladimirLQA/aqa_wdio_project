import { BaseEndpoints } from './base-endpoints';

class OrdersEndpoints extends BaseEndpoints {
  readonly orders = `api/orders/`;
  readonly orderById = (orderId: string) => `api/orders/${orderId}/`;
  readonly orderComment = 'api/orders/comments';
  readonly orderDelivery = 'api/orders/delivery/';
  readonly updateOrderStatus = 'api/orders/status';

}

export default new OrdersEndpoints();