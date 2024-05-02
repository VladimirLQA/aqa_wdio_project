import apiCustomersActions from './api-customers.actions.js';
import apiOrdersActions from './api-orders.actions.js';
import apiProductsActions from './api-products.actions.js';
import apiSignInActions from './api-sign-in.actions.js';
import commonActions from './api-common.actions.js';

export const ApiActions = {
  customers: apiCustomersActions,
  products: apiProductsActions,
  orders: apiOrdersActions,
  signIn: apiSignInActions,
  common: commonActions,
};
