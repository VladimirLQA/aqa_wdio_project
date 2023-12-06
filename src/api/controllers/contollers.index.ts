import CustomersController from './customer.controller';
import ProductsController from './products.controller';
import SignInController from './sign-in.controller';

export default {
  products: ProductsController,
  signIn: SignInController,
  customers: CustomersController,
  orders: '',
};
