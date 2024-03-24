import { ICustomerResponse } from '../../../api/type/api.customers.type.js';
import { IProductResponse } from '../../../api/type/api.product.type.js';
import { orderPageToastMessages, getScheduleOrderUI } from '../../../data/orders/orders.data.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import OrderActions from '../../../ui/actions/orders/orders.actions.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import OrdersAssertions from '../../../ui/assertions/orders_assertions/orders.assertions.js';
import OrdersDetailsActions from '../../../ui/actions/orders/orders-details.actions.js';
import { IOrder, LOCATION_TYPE, ORDER_HISTORY_ACTIONS } from '../../../ui/types/order.types.js';
import ApiProductsActions from '../../../api/api_actions/api-products.actions.js';
import ApiCustomersActions from '../../../api/api_actions/api-customers.actions.js';
import Utils from '../../../utils/utils.js';

describe('Create order tests', () => {
  let orderId: string, order: IOrder;
  let [product_01, product_02]: IProductResponse[] = [];
  let [customer]: ICustomerResponse[] = [];

  before(async () => {
    [product_01, product_02] = await ApiProductsActions.createProducts(2);
    [customer] = await ApiCustomersActions.createCustomers(1);

    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
  });

  after(async () => {});

  it('Create order', async () => {
    order = await OrderActions.createOrder(customer.name, [product_01.name, product_02.name]);
    orderId = order._id;

    await OrdersAssertions.verifyToastMessageAndCloseToast(orderPageToastMessages.orderCreated());
    await OrdersAssertions.verifyCreatedOrderInTableRow(order);
  });

  it('Should verify order data on "Order history" page', async () => {
    // verify products in section
    // total price
    // status
    // order history

    await OrderActions.clickOnDetailsActionButton(orderId);
    await OrdersDetailsActions.customerProductSection.clickOnAllAccordionButtonsInProductSection();
    // await OrdersDetailsActions.tabsSection.clickOnDeliveryTab();
    // const prepareScheduleForOrder = scheduleOrderUI();
    // await OrdersDetailsActions.tabsSection.clickOnScheduleEditDeliveryButton();
    // await OrdersDetailsActions.delivery.scheduleOrder(prepareScheduleForOrder);

    // await OrdersDetailsActions.tabsSection.clickOnHistoryTab();
    // const deliveryScheduled: any = await OrdersDetailsActions.tabsSection.getParsedAction(
    //   ORDER_HISTORY_ACTIONS.DELIVERY_SCHEDULED,
    // );

    // console.log(deliveryScheduled);
    //
    // console.log('result >>>>>>>>>', deliveryScheduled)
    //
    // await OrdersDetailsActions.customerProductSection.editCustomerModal

    // await OrdersAssertions.verifyToastMessage(orderPageToastMessages.deliverySaved());
    // await OrdersDetailsActions.customerProductSection.clickOnAllAccordionButtonsInProductSection();
    // await OrdersDetailsActions.customerProductSection.clickOnProductsPencilbutton();
    // await OrdersDetailsActions.customerProductSection.editProductModal.changeProductInOrder('Pizza52', 'Bacon73');
    // const totalPrice = await OrderDetailsPage.getText(
    //   OrderDetailsPage.orderSection['Products'].editProductsModal['Total price'],
    // );
    // Expect.toEqual({ actual: totalPrice, expected: '$2103' });
  });
});
