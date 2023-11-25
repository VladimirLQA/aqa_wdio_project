import OrdersController from '../controllers/orders.controller';
import { IApiOrdersRequest } from '../type/api.orders.type';


class ApiOrdersActions {
  async createOrder(token: string, data: IApiOrdersRequest) {

    try {
      const response = await OrdersController.createOrder({ token, data: data });
      return response;
    } catch (error: any) {
      throw new Error('Error during creating order');
    }
  }

  async getAllOrders(token: string) {
    try {
      const response = await OrdersController.getOrder({ token });
      return response;
    } catch (error) {
      throw new Error('Error while getting all orders');
    }
  }

  async deleteOrder(token: string, id: string) {
    try {
      const response = await OrdersController.deleteOrder({ token, data: { _id: id } });
      return response;
    } catch (error) {
      throw new Error('Error while deleting product');
    }
  }

  // TODO
  // async updateOrder(token: string, id: string, newProduct?: Partial<IProduct>) {
  //   try {
  //     const { name, manufacturer, amount, price, notes } = (await this.getProductByID(token, id)).data.Product;
  //     const updatedProduct = {
  //       _id: id, name, manufacturer, amount, price, notes, ...newProduct,
  //     };
  //
  //     const response = await OrdersController.updateOrder({ token, data: updatedProduct });
  //     return response;
  //   } catch (error) {
  //     throw new Error('Error while updating product');
  //   }
  // }

  async getOrderByID(token: string, id: string) {
    try {
      const response = await OrdersController.getOrder({ token, data: { _id: id } });
      return response;
    } catch (error) {
      throw new Error('Error while getting product by id');
    }
  }

  // TODO
  // add comment
  // delete comment
  // update order status
  // get order products
  // schedule delivery
}

export default new ApiOrdersActions();
