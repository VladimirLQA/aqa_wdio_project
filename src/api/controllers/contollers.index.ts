import CustomersController from './customer.controller';
import ProductsController from './products.controller';
import SignInController from './sign-in.controller';

export const ControllersList: { [key: string]: any } = {
  products: ProductsController,
  signIn: SignInController,
  customers: CustomersController,
  orders: '',
};
