import { orderPageToastMessages } from '../../../data/orders/orders.data';
import HomeActions from '../../../ui/actions/home.actions';
import CreateOrderModalActions from '../../../ui/actions/modals/orders_modals/create-order.modal.actions';
import OrderActions from '../../../ui/actions/orders/orders.actions';
import SignInActions from '../../../ui/actions/sign-in.actions';
import OrdersAssertions from '../../../ui/assertions/orders_assertions/orders.assertions';
import CreateOrderModalPage from '../../../ui/pages/aqa_project/modals/orders_modals/create-order.modal.page';
import { browserPause } from '../../../utils/helpers';

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
