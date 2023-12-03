import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import OrderActions from '../../../ui/actions/orders/orders.actions';
import { browserPause } from '../../../utils/helpers';
import OrdersAssertions from '../../../ui/assertions/orders_assertions/orders.assertions';
import { orderPageToastMessages } from '../../../data/orders/orders.data'

describe('Smoke test on orders page', () => {
  let productsArr = ['test 1', 'test 2'];
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
