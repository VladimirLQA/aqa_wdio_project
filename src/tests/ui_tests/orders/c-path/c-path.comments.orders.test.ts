import { getComment, orderPageToastMessages } from '../../../../data/orders/orders.data.js';
import SignInActions from '../../../../ui/actions/sign-in.actions.js';
import HomeActions from '../../../../ui/actions/home.actions.js';
import OrderDetailsActions from '../../../../ui/actions/orders/orders-details.actions.js';
import ApiOrdersActions from '../../../../api/api_actions/api-orders.actions.js';
import ApiSignInsActions from '../../../../api/api_actions/api-sign-in.actions.js';
import OrdersActions from '../../../../ui/actions/orders/orders.actions.js';
import OrdersAssertions from '../../../../ui/assertions/orders_assertions/orders.assertions.js';
import OrderDetailsPage from '../../../../ui/pages/aqa_project/orders/order-details.page.js';
import Expect from '../../../../utils/chai-expect/expect-collection.js';
import Utils from '../../../../utils/utils.js';
import SideBarActions from '../../../../ui/actions/side-bar.actions.js';

describe('Create order tests', () => {
  let token: string, comment: string, orderIdShared: string, products: string[], customer: string;

  before(async () => {
    token = await ApiSignInsActions.signInAsAdminAndGetToken();
    const { orderId, productsId, customerId } =
      await ApiOrdersActions.createOrderWithGeneratedProductsAndCustomer(token, 1);
    orderIdShared = orderId;

    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
    await OrdersActions.clickOnDetailsActionButton(orderId);
  });

  after(async () => {});

  context('Critical path @c-path', () => {
    it('Should not clear input text area after switching tab sections', async () => {
      //
    });

    it('Should add comment on every order status', async () => {
      //
    });
  });

  // // todo as critical path
  // it('Should display added value to input comment field after clicking on "Delivery | Order history" tabs', async () => {});
});
