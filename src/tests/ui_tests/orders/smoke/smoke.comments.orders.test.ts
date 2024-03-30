import { getComment, orderPageToastMessages } from '../../../../data/orders/orders.data.js';
import SignInActions from '../../../../ui/actions/sign-in.actions.js';
import HomeActions from '../../../../ui/actions/home.actions.js';
import OrderDetailsActions from '../../../../ui/actions/orders/orders-details.actions.js';
import OrdersActions from '../../../../ui/actions/orders/orders.actions.js';
import OrdersAssertions from '../../../../ui/assertions/orders_assertions/orders.assertions.js';
import OrderDetailsPage from '../../../../ui/pages/aqa_project/orders/order-details.page.js';
import SideBarActions from '../../../../ui/actions/side-bar.actions.js';
import { reqAsLoggedUser } from '../../../../api/request/request-as-logged-user.js';
import { ControllersList } from '../../../../api/controllers/contollers.index.js';
import { ApiActions } from '../../../../api/api_actions/api-actions.index.js';

describe('Comments order details section', () => {
  let token: string, comment: string, orderIdShared: string, products: string[], customer: string;

  before(async () => {
    token = await ApiActions.signIn.signInAsAdminAndGetToken();
    const { orderId, productsId, customerId } =
      await ApiActions.orders.createOrderWithGeneratedProductsAndCustomer(token, 1);
    orderIdShared = orderId;
    products = productsId;
    customer = customerId;

    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
    await OrdersActions.clickOnDetailsActionButton(orderId);
  });

  afterEach(async () => {
    await SideBarActions.clickOnSidebarOrdersButton();
    await OrdersActions.clickOnDetailsActionButton(orderIdShared);
  });

  after(async () => {
    await reqAsLoggedUser(ControllersList.orders.deleteOrder, { data: { _id: orderIdShared } });

    for (const product of [products]) {
      await reqAsLoggedUser(ControllersList.products.delete, { data: { _id: product } });
    }
    await reqAsLoggedUser(ControllersList.customers.delete, { data: { _id: customer } });
  });

  it('Should add comment @smoke', async () => {
    comment = getComment();

    await OrderDetailsActions.tabsSection.addCommentAndClickOnCreateButton(comment);

    await OrdersAssertions.verifyAndCloseToast(orderPageToastMessages.commentPosted());
    await OrdersAssertions.verifyElementIsDisplayed(
      OrderDetailsPage.tabsSection['Comment']['Comment by text'](comment),
      true,
    );
    await OrdersAssertions.verifyIsClickableButton(
      OrderDetailsPage.tabsSection['Comment']['Create comment button'],
      false,
    );
  });

  it('Should delete comment @smoke', async () => {
    comment = getComment();
    await OrderDetailsActions.tabsSection.addCommentAndClickOnCreateButton(comment);
    await OrderDetailsActions.closeToastMessage();
    await OrderDetailsActions.tabsSection.clickOnDeleteCommentButtonWithCommentText(comment);

    await OrdersAssertions.verifyAndCloseToast(orderPageToastMessages.commentDeleted());
    await OrdersAssertions.verifyElementIsDisplayed(
      OrderDetailsPage.tabsSection['Comment']['Comment by text'](comment),
      false,
    );
    await OrdersAssertions.verifyIsClickableButton(
      OrderDetailsPage.tabsSection['Comment']['Create comment button'],
      false,
    );
  });

  // more related to component (unit) tests
  it(`Should display error on incorrect input with "<>" symbols and clear error after correction @smoke`, async () => {
    comment = getComment();
    await OrderDetailsActions.tabsSection.fillCommentText(comment + '<>');
    await OrdersAssertions.verifyElementIsDisplayed(
      OrderDetailsPage.tabsSection['Comment']['Error input text area'],
      true,
    );

    await OrderDetailsActions.clearInputField(
      OrderDetailsPage.tabsSection['Comment']['Comments input text area'],
    );
    await OrderDetailsActions.tabsSection.fillCommentText(comment);
    await OrdersAssertions.verifyElementIsDisplayed(
      OrderDetailsPage.tabsSection['Comment']['Error input text area'],
      false,
    );
  });
});
