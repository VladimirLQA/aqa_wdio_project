import { orderPageToastMessages } from '../../../data/orders/orders.data.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import CreateOrderModalActions from '../../../ui/actions/modals/orders_modals/create-order.modal.actions.js';
import OrderActions from '../../../ui/actions/orders/orders.actions.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import OrdersAssertions from '../../../ui/assertions/orders_assertions/orders.assertions.js';
import CreateOrderModalPage from '../../../ui/pages/aqa_project/modals/orders_modals/create-order.modal.page.js';

describe('Smoke test on orders page', () => {
  let productsArr = ['test 1', 'test 2', 'test 3'];
  // TODO add to before hook products(4) and customers(2) creation
  before(async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
  });

  after(async () => {});

  it('Create order', async () => {
    await OrderActions.createOrder('Anatoly', productsArr);
    await OrdersAssertions.verifyToastMessage(orderPageToastMessages.orderCreated());
  });
});
