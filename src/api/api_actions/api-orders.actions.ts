import { ORDER_STATUSES } from '../../ui/types/order.types.js';
import OrdersController from '../controllers/orders.controller.js';
import {
  IApiCommentRequest,
  IApiOrderDeliveryRequest,
  IApiOrdersRequest,
  IOrderData,
} from '../type/api.orders.type.js';
import { IProductResponse } from '../type/api.product.type.js';
import Utils from '../../utils/utils.js';
import { ICustomerResponse } from '../type/api.customers.type.js';
import ApiProductsActions from './api-products.actions.js';
import ApiCustomersActions from './api-customers.actions.js';

class ApiOrdersActions {
  async createOrder(token: string, data: IApiOrdersRequest) {
    try {
      const response = await OrdersController.createOrder({ token, data: data });
      return response;
    } catch (error: any) {
      throw new Error('Error during creating order');
    }
  }

  async createOrderWithGeneratedProductsAndCustomer(
    token: string,
    productCount: number,
  ): Promise<IOrderData> {
    const productsId = (await ApiProductsActions.createProducts(productCount)).map((p) => p._id);
    const customerId = (await ApiCustomersActions.createCustomers(1))[0]._id;

    try {
      const response = await OrdersController.createOrder({
        token,
        data: {
          customer: customerId,
          products: [...productsId],
        },
      });
      return { orderId: response.data?.Order._id, productsId, customerId };
    } catch (error: any) {
      throw new Error('Error during creating order');
    }
  }

  async getAllOrders(token: string) {
    try {
      const response = await OrdersController.get({ token });
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

  async updateCustomerInOrder(token: string, data: IApiOrdersRequest) {
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

  async updateProductInOrder(token: string, data: IApiOrdersRequest) {
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

  async addCommentToOrder(token: string, comment: IApiCommentRequest) {
    console.log(comment);
    try {
      const response = await OrdersController.addComment({ token, data: comment });
      return response;
    } catch (error) {
      throw new Error(`Error while adding comment to order with - ${comment._id}`);
    }
  }

  async deleteCommentInOrder(token: string, comment: IApiCommentRequest) {
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
    const response = await this.updateOrderStatus(
      token,
      orderId,
      ORDER_STATUSES.PARTIALLY_RECEIVED,
    );
    return response;
  }

  async scheduleOrderDelivery(token: string, delivery: IApiOrderDeliveryRequest) {
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

  async scheduleOrderPickup(token: string, pickup: IApiOrderDeliveryRequest) {
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

  async receiveProductInOrder(
    token: string,
    productId: Pick<IApiOrdersRequest, '_id' | 'products'>,
  ) {
    try {
      const response = await OrdersController.receive({
        token,
        data: productId,
      });
      return response;
    } catch (error) {
      throw new Error(
        `Error while receiving product in order, order id - ${productId.products?.at(-1)}`,
      );
    }
  }
  async receiveAllProductsInOrder(
    token: string,
    productsId: Pick<IApiOrdersRequest, '_id' | 'products'>,
  ) {
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
      const products: IProductResponse[] = (await this.getOrderByID(token, orderId)).data.Order
        .products;
      return Utils.sortById(products);
    } catch (error) {
      throw new Error(`Error while getting all products from order, order id - ${orderId}`);
    }
  }

  async getCustomerFromOrder(token: string, orderId: string) {
    try {
      const customer: ICustomerResponse = (await this.getOrderByID(token, orderId)).data.Order
        .customer;
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
