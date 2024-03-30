import { ICustomerResponse } from '../../../api/type/api.customers.type.js';
import { IProductResponse } from '../../../api/type/api.product.type.js';
import { orderPageToastMessages } from '../../../data/orders/orders.data.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import OrderActions from '../../../ui/actions/orders/orders.actions.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import OrdersAssertions from '../../../ui/assertions/orders_assertions/orders.assertions.js';
import OrdersDetailsActions from '../../../ui/actions/orders/orders-details.actions.js';
import { IOrder } from '../../../ui/types/order.types.js';
import ApiProductsActions from '../../../api/api_actions/api-products.actions.js';
import ApiCustomersActions from '../../../api/api_actions/api-customers.actions.js';
import Utils from '../../../utils/utils.js';
import SideBarActions from '../../../ui/actions/side-bar.actions.js';
import { ControllersList } from '../../../api/controllers/contollers.index.js';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user.js';

describe('Create order tests', () => {
  let orderId: string, order: IOrder;
  let [product_01, product_02]: IProductResponse[] = [];
  let [customer]: ICustomerResponse[] = [];

  before(async () => {
    [product_01, product_02] = await ApiProductsActions.createProducts(2);
    [customer] = await ApiCustomersActions.createCustomers(1);

    await SignInActions.openSalesPortal();
  });

  beforeEach(async () => {
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
  });

  afterEach(async () => {
    await SideBarActions.clickOnSignOutButton();
  });

  after(async () => {
    await reqAsLoggedUser(ControllersList.orders.deleteOrder, { data: { _id: orderId } });
    for (const product of [product_01, product_02]) {
      await reqAsLoggedUser(ControllersList.products.delete, { data: { _id: product._id } });
    }
    await reqAsLoggedUser(ControllersList.customers.delete, { data: { _id: customer._id } });
  });

  it('Create order', async () => {
    order = await OrderActions.createOrder(customer.name, [product_01.name, product_02.name]);
    orderId = order._id;

    await OrdersAssertions.verifyAndCloseToast(orderPageToastMessages.orderCreated());
    await OrdersAssertions.verifyCreatedOrderInTableRow(order);
  });

  it('Should change order status to "In process"', async () => {
    await OrderActions.clickOnDetailsActionButton(orderId);
    await OrdersDetailsActions.tabsSection.clickOnDeliveryTab();
    await OrdersDetailsActions.tabsSection.clickOnScheduleEditDeliveryButton();
    await OrdersDetailsActions.delivery.scheduleOrder();
    await OrdersDetailsActions.closeToastMessage();
    await OrdersDetailsActions.clickOnProcessOrderButton();
    await OrdersDetailsActions.clickOnYesButtonInProcessOrderModal();

    await Utils.browserPause(500);
    await OrdersAssertions.verifyAndCloseToast(orderPageToastMessages.orderProcessingStarted());
    await SideBarActions.clickOnSidebarOrdersButton();

    order = await OrderActions.getOrder(customer.name, [product_01.name, product_02.name]);
    await OrdersAssertions.verifyCreatedOrderInTableRow(order);
  });

  it('Should change order status to "Received"', async () => {
    await OrderActions.clickOnDetailsActionButton(orderId);
    await OrdersDetailsActions.customerProductSection.clickOnReceiveButton();
    await OrdersDetailsActions.customerProductSection.clickOnSelectAllCheckbox();
    await OrdersDetailsActions.customerProductSection.clickOnSaveReceivedProductsButton();

    await Utils.browserPause(500);
    await OrdersAssertions.verifyAndCloseToast(orderPageToastMessages.productReceived());
    await SideBarActions.clickOnSidebarOrdersButton();

    order = await OrderActions.getOrder(customer.name, [product_01.name, product_02.name]);
    await OrdersAssertions.verifyCreatedOrderInTableRow(order);
  });
});
