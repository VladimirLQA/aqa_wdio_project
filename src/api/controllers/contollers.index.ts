import CustomersController from './customer.controller.js';
import ProductsController from './products.controller.js';
import SignInController from './sign-in.controller.js';
import OrdersController from './orders.controller.js';

export const ControllersList = {
  products: ProductsController,
  signIn: SignInController,
  customers: CustomersController,
  orders: OrdersController,
};
