import { commentsForOrderStatus, getComment, orderPageToastMessages } from '../../../../data/orders/orders.data.js';
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
import OrdersDeliveryActions from '../../../../ui/actions/orders/orders-delivery.actions.js';
import { ApiActions } from '../../../../api/api_actions/api-actions.index.js';
import { ControllersList } from '../../../../api/controllers/contollers.index.js';
import { reqAsLoggedUser } from '../../../../api/request/request-as-logged-user.js';

describe('Order - comments tests @c-path', () => {
  let token: string,
    comment: string,
    orders: string[] = [],
    products: string[] = [],
    customers: string[] = [],
    productName: string;

  before(async () => {
    token = await ApiSignInsActions.signInAsAdminAndGetToken();

    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
  });

  beforeEach(async () => {
    let { orderId, productsId, customerId } = await ApiOrdersActions.createOrderWithDraftStatus(token, {});
    productName = (await ApiActions.products.getProductByID(token, productsId[0])).data.Product.name;

    await SideBarActions.clickOnSidebarOrdersButton();
    await OrdersActions.clickOnDetailsActionButton(orderId);

    orders.push(orderId);
    customers.push(customerId);
    products.push(...productsId);
  });

  afterEach(async () => {
    await SideBarActions.clickOnSidebarOrdersButton();
  });

  after(async () => {
    for (const order of orders) {
      await reqAsLoggedUser(ControllersList.orders.deleteOrder, { data: { _id: order } });
    }

    for (const product of products) {
      await reqAsLoggedUser(ControllersList.products.delete, { data: { _id: product } });
    }

    for (const customer of customers) {
      await reqAsLoggedUser(ControllersList.customers.delete, { data: { _id: customer } });
    }
  });

  it('Should add and delete comment in cancelled order', async () => {
    comment = getComment();
    await OrderDetailsActions.confirmCancelOrder();
    await OrderDetailsActions.closeToastMessage();
    const toastMessages: boolean[] = [];

    await OrderDetailsActions.tabsSection.addCommentAndClickOnCreateButton(comment);
    toastMessages.push(
      await OrdersAssertions.elementIsDisplayedAndContainText(OrderDetailsPage['Toast text'], orderPageToastMessages.commentPosted()),
    );
    await OrderDetailsActions.closeToastMessage();

    await OrderDetailsActions.tabsSection.clickOnDeleteCommentButtonWithCommentText(comment);
    toastMessages.push(
      await OrdersAssertions.elementIsDisplayedAndContainText(OrderDetailsPage['Toast text'], orderPageToastMessages.commentDeleted()),
    );
    await OrderDetailsActions.closeToastMessage();
    Expect.toBeTrue({ actual: toastMessages.every((item) => item) });
  });

  it('Should add comment on every positive order status', async () => {
    comment = getComment();
    const toastMessages: boolean[] = [];
    await OrderDetailsActions.tabsSection.addCommentAndClickOnCreateButton(comment);
    toastMessages.push(
      await OrdersAssertions.elementIsDisplayedAndContainText(OrderDetailsPage['Toast text'], orderPageToastMessages.commentPosted()),
    );
    await OrderDetailsActions.closeToastMessage();

    await OrderDetailsActions.tabsSection.clickOnDeliveryTab();
    await OrderDetailsActions.tabsSection.clickOnScheduleEditDeliveryButton();
    await OrdersDeliveryActions.scheduleOrder();
    await OrderDetailsActions.closeToastMessage();
    await OrderDetailsActions.confirmProcessOrder();
    await OrderDetailsActions.closeToastMessage();

    await OrderDetailsActions.tabsSection.clickOnCommentsTab();
    await OrderDetailsActions.tabsSection.addCommentAndClickOnCreateButton(comment);
    toastMessages.push(
      await OrdersAssertions.elementIsDisplayedAndContainText(OrderDetailsPage['Toast text'], orderPageToastMessages.commentPosted()),
    );
    await OrderDetailsActions.closeToastMessage();

    await OrderDetailsActions.customerProductSection.clickOnReceiveButton();
    await OrderDetailsActions.customerProductSection.clickOnCheckboxWithSpecifiedProductName(productName);
    await OrderDetailsActions.customerProductSection.clickOnSaveReceivedProductsButton();
    await OrderDetailsActions.closeToastMessage();

    await OrderDetailsActions.tabsSection.addCommentAndClickOnCreateButton(comment);
    toastMessages.push(
      await OrdersAssertions.elementIsDisplayedAndContainText(OrderDetailsPage['Toast text'], orderPageToastMessages.commentPosted()),
    );
    await OrderDetailsActions.closeToastMessage();

    await OrderDetailsActions.customerProductSection.clickOnReceiveButton();
    await OrderDetailsActions.customerProductSection.clickOnSelectAllCheckbox();
    await OrderDetailsActions.customerProductSection.clickOnSaveReceivedProductsButton();
    await OrderDetailsActions.closeToastMessage();

    await OrderDetailsActions.tabsSection.addCommentAndClickOnCreateButton(comment);
    toastMessages.push(
      await OrdersAssertions.elementIsDisplayedAndContainText(OrderDetailsPage['Toast text'], orderPageToastMessages.commentPosted()),
    );
    await OrderDetailsActions.closeToastMessage();
    Expect.toBeTrue({ actual: toastMessages.every((item) => item) });
  });
});
