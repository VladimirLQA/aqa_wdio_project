import OrdersController from '../controllers/orders.controller.js';
import Utils from '../../utils/utils.js';
import ApiProductsActions from './api-products.actions.js';
import ApiCustomersActions from './api-customers.actions.js';
import { ICustomerFromResponse } from '../../types/customers.types.js';
import { IProductFromResponse } from '../../types/products.types.js';
import { IOrdersRequest, IOrderData, ICommentRequest, ORDER_STATUSES, IOrderDeliveryRequest, IOrderResponseData } from '../../types/order.types.js';
import { getScheduleOrder } from '../../data/orders/orders.data.js';

class ApiOrdersActions {
  async createOrderWithDraftStatus(token: string, orderData: Partial<IOrderData>, deliveryData?: IOrderDeliveryRequest): Promise<IOrderData> {
    const data: IOrdersRequest = {
      customer: orderData.customerId ?? (await ApiCustomersActions.createCustomers(1))[0]._id,
      products: [],
    };

    if (!data.products.length) {
      const productsId = (await ApiProductsActions.createProducts(2)).map((p) => p._id);
      data.products.push(...productsId);
    } else {
      data.products.push(...orderData.productsId!);
    }

    const order = await OrdersController.createOrder({ token, data });
    if (deliveryData) {
      deliveryData.delivery = deliveryData.delivery ?? getScheduleOrder();
      deliveryData._id = order.data.Order._id;
      await this.scheduleOrderDelivery(token, deliveryData);
    }

    return {
      orderId: order.data.Order._id,
      productsId: data.products,
      customerId: data.customer,
    };
  }

  async createOrderWithInProcessStatus(token: string, orderData: IOrderData, deliveryData: IOrderDeliveryRequest) {
    const order = await this.createOrderWithDraftStatus(token, orderData, deliveryData);
    await OrdersController.updateOrderStatus({ token, data: { status: ORDER_STATUSES.IN_PROCESS, _id: order.orderId } });
    return order;
  }

  async createOrderWithPartiallyReceivedStatus(token: string, orderData: IOrderData, deliveryData: IOrderDeliveryRequest) {
    const order = await this.createOrderWithInProcessStatus(token, orderData, deliveryData);
    await OrdersController.receive({ token, data: { _id: orderData.orderId, products: [orderData.productsId[0]] } });
    return order;
  }

  async createOrderWithReceivedStatus(token: string, orderData: IOrderData, deliveryData: IOrderDeliveryRequest) {
    const order = await this.createOrderWithInProcessStatus(token, orderData, deliveryData);
    await OrdersController.receive({ token, data: { _id: orderData.orderId, products: orderData.productsId } });
    return order;
  }

  async createOrderWithCanceledStatus(token: string, orderData: IOrderData, deliveryData?: IOrderDeliveryRequest) {
    let order: IOrderData;
    if (deliveryData) order = await this.createOrderWithDraftStatus(token, orderData, deliveryData);
    else order = await this.createOrderWithDraftStatus(token, orderData);
    await OrdersController.updateOrderStatus({ token, data: { _id: orderData.orderId, status: ORDER_STATUSES.CANCELED } });
    return order;
  }

  async updateCustomerInOrder(token: string, data: IOrdersRequest) {
    const response = await OrdersController.updateOrder({
      token,
      data: {
        ...data,
      },
    });
    return response;
  }

  async updateProductInOrder(token: string, data: IOrdersRequest) {
    const response = await OrdersController.updateOrder({
      token,
      data: {
        ...data,
      },
    });
    return response;
  }

  async getOrderByID(token: string, orderId: string) {
    const response = await OrdersController.get({ token, data: { _id: orderId } });
    return response;
  }

  async getAllOrders(token: string) {
    const response = await OrdersController.getAll({ token });
    return response;
  }

  async addCommentToOrder(token: string, comment: ICommentRequest) {
    const response = await OrdersController.addComment({ token, data: comment });
    return response;
  }

  async deleteCommentInOrder(token: string, comment: ICommentRequest) {
    const response = await OrdersController.deleteComment({
      token,
      data: comment,
    });
    return response;
  }

  async updateOrderStatus(token: string, orderId: string, status: ORDER_STATUSES) {
    const response = await OrdersController.updateOrderStatus({
      token,
      data: {
        _id: orderId,
        status,
      },
    });
    return response;
  }

  async createOrder(token: string, data: IOrdersRequest) {
    const response = await OrdersController.createOrder({ token, data: data });
    return response;
  }

  async updateOrderStatusToInProcess(token: string, orderId: string) {
    const response = await this.updateOrderStatus(token, orderId, ORDER_STATUSES.IN_PROCESS);
    return response;
  }

  async updateOrderStatusToCanceled(token: string, orderId: string) {
    const response = await this.updateOrderStatus(token, orderId, ORDER_STATUSES.CANCELED);
    return response;
  }

  async updateOrderStatusToReceived(token: string, orderId: string) {
    const response = await this.updateOrderStatus(token, orderId, ORDER_STATUSES.RECEIVED);
    return response;
  }

  async updateOrderStatusToPartialyReceived(token: string, orderId: string) {
    const response = await this.updateOrderStatus(token, orderId, ORDER_STATUSES.PARTIALLY_RECEIVED);
    return response;
  }

  async scheduleOrderDelivery(token: string, delivery: IOrderDeliveryRequest) {
    const response = await OrdersController.delivery({ token, data: delivery });
    return response;
  }

  async receiveProductsInOrder(token: string, orderData: Partial<IOrderData>) {
    const response = await OrdersController.receive({ token, data: { _id: orderData.orderId, products: orderData.productsId } });
    return response;
  }

  async getProductsFromOrder(token: string, orderId: string) {
    const products: IProductFromResponse[] = (await this.getOrderByID(token, orderId)).data.Order.products;
    return Utils.sortById(products);
  }

  async getCustomerFromOrder(token: string, orderId: string) {
    const customer: ICustomerFromResponse = (await this.getOrderByID(token, orderId)).data.Order.customer;
    return customer;
  }

  async getTotalPriceFromOrder(token: string, orderId: string) {
    const price: number = (await this.getOrderByID(token, orderId)).data.Order.total_price;
    return price;
  }

  async getStatusFromOrder(token: string, orderId: string) {
    const status: ORDER_STATUSES = (await this.getOrderByID(token, orderId)).data.Order.status;
    return status;
  }
}

export default new ApiOrdersActions();
