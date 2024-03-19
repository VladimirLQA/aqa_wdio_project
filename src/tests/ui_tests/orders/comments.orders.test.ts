import { getComment, orderPageToastMessages } from '../../../data/orders/orders.data.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import OrderDetailsActions from '../../../ui/actions/orders/orders-details.actions.js';
import ApiOrdersActions from '../../../api/api_actions/api-orders.actions.js';
import ApiSignInsActions from '../../../api/api_actions/api-sign-in.actions.js';
import OrdersActions from '../../../ui/actions/orders/orders.actions.js';
import OrdersAssertions from '../../../ui/assertions/orders_assertions/orders.assertions.js';
import OrderDetailsPage from '../../../ui/pages/aqa_project/orders/order-details.page.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import Utils from '../../../utils/utils.js';

describe('Create order tests', () => {
  let token: string, comment: string, orderIdShared: string;

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

  beforeEach(async () => {
    await HomeActions.openOrdersPage();
    await OrdersActions.clickOnDetailsActionButton(orderIdShared);
  });

  after(async () => {});

  it('Should add comment', async () => {
    comment = getComment();

    await OrderDetailsActions.tabsSection.addCommentAndClickOnCreateButton(comment);

    await OrdersAssertions.verifyToastMessageAndCloseToast(orderPageToastMessages.commentPosted());
    await OrdersAssertions.verifyElementIsDisplayed(
      OrderDetailsPage.tabsSection['Comment']['Comment text'](comment),
      true,
    );
    await OrdersAssertions.verifyClickableButton(
      OrderDetailsPage.tabsSection['Comment']['Create comment button'],
      false,
    );
  });

  it('Should delete comment', async () => {
    comment = getComment();
    await OrderDetailsActions.tabsSection.addCommentAndClickOnCreateButton(comment);
    await OrderDetailsActions.tabsSection.clickOnDeleteCommentButtonWithCommentText(comment);

    await OrdersAssertions.verifyToastMessageAndCloseToast(orderPageToastMessages.commentDeleted());
    await OrdersAssertions.verifyElementIsDisplayed(
      OrderDetailsPage.tabsSection['Comment']['Comment text'](comment),
      false,
    );
    await OrdersAssertions.verifyClickableButton(
      OrderDetailsPage.tabsSection['Comment']['Create comment button'],
      false,
    );
  });

  it(`Should display error on incorrect input with "<>" symbols and clear error after correction`, async () => {});

  // todo as critical path
  it('Should display added value to input comment field after clicking on "Delivery | Order history" tabs', async () => {});
  it('Should add comment to canceled order', async () => {});
  it('Should delete comment in canceled order', async () => {});
  it('Should add comment to received order', async () => {});
  it('Should delete comment in received order', async () => {});
});
