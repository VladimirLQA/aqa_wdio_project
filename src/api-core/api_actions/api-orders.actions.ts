import OrdersController from '../controllers/orders.controller.js';
import Utils from '../../utils/utils.js';
import ApiProductsActions from './api-products.actions.js';
import ApiCustomersActions from './api-customers.actions.js';
import { ICustomerFromResponse } from '../../types/customers.types.js';
import { IProductFromResponse } from '../../types/products.types.js';
import { IOrdersRequest, IOrderData, ICommentRequest, ORDER_STATUSES, IOrderDeliveryRequest } from '../../types/order.types.js';

class ApiOrdersActions {
  async createOrder(token: string, data: IOrdersRequest) {
    try {
      const response = await OrdersController.createOrder({ token, data: data });
      return response;
    } catch (error: any) {
      throw new Error('Error during creating order');
    }
  }

  async createOrderWithDraftStatus(token: string, orderData: Partial<IOrderData>): Promise<IOrderData> {
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

    try {
      const response = await OrdersController.createOrder({
        token,
        data,
      });
      return {
        orderId: response.data?.Order._id,
        productsId: data.products,
        customerId: data.customer,
      };
    } catch (error: any) {
      throw new Error('Error during creating order');
    }
  }

  async getAllOrders(token: string) {
    try {
      const response = await OrdersController.getAll({ data: {}, token });
      return response;
    } catch (error) {
      throw new Error('Error while getting all orders');
    }
  }

  async deleteOrder(token: string, orderId: string) {
    try {
      const response = await OrdersController.deleteOrder({ token, data: { _id: orderId } });
      return response;
    } catch (error) {
      throw new Error(`Error while deleting order by id - ${orderId}`);
    }
  }

  async updateCustomerInOrder(token: string, data: IOrdersRequest) {
    try {
      const response = await OrdersController.updateOrder({
        token,
        data: {
          ...data,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Error while updating customer in order with id - ${data._id}`);
    }
  }

  async updateProductInOrder(token: string, data: IOrdersRequest) {
    try {
      const response = await OrdersController.updateOrder({
        token,
        data: {
          ...data,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Error while updating product in order with id - ${data._id}`);
    }
  }

  async getOrderByID(token: string, orderId: string) {
    try {
      const response = await OrdersController.get({ token, data: { _id: orderId } });
      return response;
    } catch (error) {
      throw new Error(`Error while getting order by id - ${orderId}`);
    }
  }

  async addCommentToOrder(token: string, comment: ICommentRequest) {
    console.log(comment);
    try {
      const response = await OrdersController.addComment({ token, data: comment });
      return response;
    } catch (error) {
      throw new Error(`Error while adding comment to order with - ${comment._id}`);
    }
  }

  async deleteCommentInOrder(token: string, comment: ICommentRequest) {
    try {
      const response = await OrdersController.deleteComment({
        token,
        data: comment,
      });
      return response;
    } catch (error) {
      throw new Error(`Error while deleting comment in order with id - ${comment.comments._id}`);
    }
  }

  async updateOrderStatus(token: string, orderId: string, status: ORDER_STATUSES) {
    try {
      const response = await OrdersController.updateOrderStatus({
        token,
        data: {
          _id: orderId,
          status,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Error while updating status in order with orderId - ${orderId}`);
    }
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
    try {
      const response = await OrdersController.delivery({
        token,
        data: delivery,
      });
      return response;
    } catch (error) {
      throw new Error(`Error while scheduling order delivery in order, order id - ${delivery._id}`);
    }
  }

  async scheduleOrderPickup(token: string, pickup: IOrderDeliveryRequest) {
    try {
      const response = await OrdersController.delivery({
        token,
        data: pickup,
      });
      return response;
    } catch (error) {
      throw new Error(`Error while scheduling order pickup in order, order id - ${pickup._id}`);
    }
  }

  async receiveProductInOrder(token: string, productId: Pick<IOrdersRequest, '_id' | 'products'>) {
    try {
      const response = await OrdersController.receive({
        token,
        data: productId,
      });
      return response;
    } catch (error) {
      throw new Error(`Error while receiving product in order, order id - ${productId.products?.at(-1)}`);
    }
  }
  async receiveAllProductsInOrder(token: string, productsId: Pick<IOrdersRequest, '_id' | 'products'>) {
    try {
      const response = await OrdersController.receive({
        token,
        data: productsId,
      });
      return response;
    } catch (error) {
      throw new Error(`Error while receiving products in order, order id - ${productsId._id}`);
    }
  }

  async getAllProductsFromOrder(token: string, orderId: string) {
    try {
      const products: IProductFromResponse[] = (await this.getOrderByID(token, orderId)).data.Order.products;
      return Utils.sortById(products);
    } catch (error) {
      throw new Error(`Error while getting all products from order, order id - ${orderId}`);
    }
  }

  async getCustomerFromOrder(token: string, orderId: string) {
    try {
      const customer: ICustomerFromResponse = (await this.getOrderByID(token, orderId)).data.Order.customer;
      return customer;
    } catch (error) {
      throw new Error(`Error while getting customer from order, order id - ${orderId}`);
    }
  }

  async getTotalPriceFromOrder(token: string, orderId: string) {
    try {
      const price: number = (await this.getOrderByID(token, orderId)).data.Order.total_price;
      return price;
    } catch (error) {
      throw new Error(`Error while getting total price from order, order id - ${orderId}`);
    }
  }

  async getStatusFromOrder(token: string, orderId: string) {
    try {
      const status: ORDER_STATUSES = (await this.getOrderByID(token, orderId)).data.Order.status;
      return status;
    } catch (error) {
      throw new Error(`Error while getting total price from order, order id - ${orderId}`);
    }
  }
}

export default new ApiOrdersActions();
