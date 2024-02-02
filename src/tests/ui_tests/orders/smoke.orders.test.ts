import { ICustomerResponse } from '../../../api/type/api.customers.type.js';
import { IProductResponse } from '../../../api/type/api.product.type.js';
import { orderPageToastMessages } from '../../../data/orders/orders.data.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import CreateOrderModalActions from '../../../ui/actions/modals/orders_modals/create-order.modal.actions.js';
import OrderActions from '../../../ui/actions/orders/orders.actions.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import OrdersAssertions from '../../../ui/assertions/orders_assertions/orders.assertions.js';
import CreateOrderModalPage from '../../../ui/pages/aqa_project/modals/orders_modals/create-order.modal.page.js';
import ApiProductsActions from '../../../api/api_actions/api-products.actions.js';
import ApiCustomersActions from '../../../api/api_actions/api-customers.actions.js';
import OrdersDetailsActions from '../../../ui/actions/orders/orders-details.actions.js';
import { getNewCustomer } from '../../../data/customers/customers.data.js';
import { IOrder } from '../../../ui/types/order.types.js';
import helpers from '../../../utils/helpers.js';
import ProductsDetailsSectionPage from '../../../ui/pages/aqa_project/orders/order-products-section.page.js';
import OrderDetailsPage from '../../../ui/pages/aqa_project/orders/order-details.page.js';

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

    await OrdersAssertions.verifyToastMessage(orderPageToastMessages.orderCreated());
    await OrdersAssertions.verifyCreatedOrderInTableRow(order);
  });

  it('Should verify order data on "Order details" page', async () => {
    // verify products in section
    // total price
    // status
    // order history
    await OrderActions.clickOnDetailsActionButton(orderId);
    // await OrdersAssertions.verifyCustomerInCustomerDetailsSection(customer);
    await OrdersDetailsActions.clickOnAllAccordionButtonsInProductDetailsSection();
    await OrdersAssertions.verifyProductsInProductsDetailsSection([product_01, product_02]);
  });
});
