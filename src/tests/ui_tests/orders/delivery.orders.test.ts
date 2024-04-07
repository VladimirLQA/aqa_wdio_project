import { ApiActions } from '../../../api/api_actions/api-actions.index.js';
import { ControllersList } from '../../../api/controllers/contollers.index.js';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user.js';
import { DeliveryPageTitles, getScheduleOrderUI, getShopAddress, orderPageToastMessages } from '../../../data/orders/orders.data.js';
import { DELIVERY, IAddress, IDeliveryWithLocation, ORDER_HISTORY_ACTIONS } from '../../../types/order.types.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import OrderDetailsActions from '../../../ui/actions/orders/orders-details.actions.js';
import OrdersActions from '../../../ui/actions/orders/orders.actions.js';
import OrdersAssertions from '../../../ui/assertions/orders_assertions/orders.assertions.js';
import OrderDetailsPage from '../../../ui/pages/aqa_project/orders/order-details.page.js';
import SideBarActions from '../../../ui/actions/side-bar.actions.js';
import OrdersDeliveryActions from '../../../ui/actions/orders/orders-delivery.actions.js';
import OrdersDeliveryPage from '../../../ui/pages/aqa_project/orders/orders-delivery.page.js';
import utils from '../../../utils/utils.js';

describe('Customer order section', () => {
  let token: string,
    orderIdShared: string,
    products: string[] = [],
    customer: string[] = [],
    actualDelivery: IDeliveryWithLocation,
    prevDelivery: IDeliveryWithLocation,
    customerAddress: IAddress;

  before(async () => {
    token = await ApiActions.signIn.signInAsAdminAndGetToken();
    const { orderId, productsId, customerId } = await ApiActions.orders.createOrderWithDraftStatus(token, {});
    orderIdShared = orderId;
    products = productsId;
    customer.push(customerId);
    customerAddress = await ApiActions.customers.getCustomerAddress(token, customerId);
    await SignInActions.openSalesPortal();
  });

  beforeEach(async () => {
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
    await OrdersActions.clickOnDetailsActionButton(orderIdShared);
  });

  afterEach(async () => {
    await SideBarActions.clickOnSignOutButton();
  });

  after(async () => {
    await reqAsLoggedUser(ControllersList.orders.deleteOrder, { data: { _id: orderIdShared } });
    for (const product of [products]) {
      await reqAsLoggedUser(ControllersList.products.delete, { data: { _id: product } });
    }
    await reqAsLoggedUser(ControllersList.customers.delete, { data: { _id: customer } });
  });

  it('Should schedule delivery', async () => {
    actualDelivery = getScheduleOrderUI({ address: customerAddress });
    prevDelivery = actualDelivery;
    await OrderDetailsActions.tabsSection.clickOnDeliveryTab();
    await OrderDetailsActions.tabsSection.clickOnScheduleEditDeliveryButton();
    await OrdersAssertions.verifyElementText(OrdersDeliveryPage['Page title'], DeliveryPageTitles.schedule);
    await OrdersDeliveryActions.scheduleOrder(actualDelivery);

    await OrdersAssertions.verifyAndCloseToast(orderPageToastMessages.deliverySaved());
    await OrderDetailsActions.tabsSection.clickOnHistoryTab();
    await OrdersAssertions.verifyDeliveryInOrderHistory(actualDelivery, ORDER_HISTORY_ACTIONS.DELIVERY_SCHEDULED);
  });

  it.only('... ', async () => {
    actualDelivery = getScheduleOrderUI({
      condition: DELIVERY.PICK_UP,
    });

    await OrderDetailsActions.tabsSection.clickOnDeliveryTab();
    await OrderDetailsActions.tabsSection.clickOnScheduleEditDeliveryButton();
    await $(OrderDetailsPage.delivery['Delivery Type dropdown']).click();
    await utils.browserPause(4000);
    await $(OrderDetailsPage.delivery['Delivery Type dropdown']).selectByVisibleText('Pickup');
    await utils.browserPause(4000);
    await $(OrderDetailsPage.delivery['Delivery Type dropdown']).click();
    await utils.browserPause(4000);
    // await OrdersDeliveryActions.basePage.click(OrderDetailsPage.delivery['Delivery Type dropdown']);
    // await OrderDetailsActions.basePage.browserExecute(
    //   `document.querySelector('select#inputType').selectedIndex = 1`,
    // );
    // await utils.browserPause(4000);
    // await OrdersDeliveryActions.basePage.click(OrderDetailsPage.delivery['Delivery Type dropdown']);
    // await utils.browserPause(10000);
    // await OrderDetailsActions.basePage.browserExecute(
    //   `document.querySelector('select#inputType').selectedIndex = 0`,
    // );
    // await utils.browserPause(4000);
    // await OrderDetailsActions.basePage.browserExecute(
    //   `document.querySelector('select#inputType').selectedIndex = 1`,
    // );
    // await OrdersDeliveryActions.scheduleOrder(actualDelivery);
  });

  it('Should edit delivery', async () => {
    actualDelivery = getScheduleOrderUI({
      address: getShopAddress(customerAddress.country),
      condition: DELIVERY.PICK_UP,
    });

    await OrderDetailsActions.tabsSection.clickOnDeliveryTab();
    await OrderDetailsActions.tabsSection.clickOnScheduleEditDeliveryButton();
    await OrdersAssertions.verifyElementText(OrdersDeliveryPage['Page title'], DeliveryPageTitles.edit);
    await OrdersDeliveryActions.scheduleOrder(actualDelivery);
    await OrdersAssertions.verifyAndCloseToast(orderPageToastMessages.deliverySaved());
    await OrderDetailsActions.tabsSection.clickOnHistoryTab();
    await OrdersAssertions.verifyDeliveryInOrderHistory(actualDelivery, ORDER_HISTORY_ACTIONS.DELIVERY_EDITED);
    // verify prev delivery
    await OrdersAssertions.verifyDeliveryInOrderHistory(prevDelivery, ORDER_HISTORY_ACTIONS.DELIVERY_EDITED, true);
  });
});
