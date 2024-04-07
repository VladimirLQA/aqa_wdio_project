import { ApiActions } from '../../../api/api_actions/api-actions.index.js';
import { ControllersList } from '../../../api/controllers/contollers.index.js';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user.js';
import { orderPageToastMessages } from '../../../data/orders/orders.data.js';
import SignInActions from '../../../ui/actions/sign-in.actions.js';
import HomeActions from '../../../ui/actions/home.actions.js';
import OrderDetailsActions from '../../../ui/actions/orders/orders-details.actions.js';
import OrdersActions from '../../../ui/actions/orders/orders.actions.js';
import OrdersAssertions from '../../../ui/assertions/orders_assertions/orders.assertions.js';
import OrderDetailsPage from '../../../ui/pages/aqa_project/orders/order-details.page.js';
import { ICustomer, ICustomerFromResponse } from '../../../types/customers.types.js';
import { generateCustomer } from '../../../data/customers/customers.data.js';
import { ORDER_HISTORY_ACTIONS } from '../../../types/order.types.js';
import utils from '../../../utils/utils.js';

describe('Customer order section', () => {
  let token: string,
    orderIdShared: string,
    products: string[] = [],
    customer: string[] = [],
    newOrderCustomer: ICustomerFromResponse;

  before(async () => {
    token = await ApiActions.signIn.signInAsAdminAndGetToken();

    newOrderCustomer = (await ApiActions.customers.createCustomer(token, generateCustomer())).data.Customer;

    const { orderId, productsId, customerId } = await ApiActions.orders.createOrderWithDraftStatus(token, {});
    orderIdShared = orderId;
    products = productsId;
    customer.push(customerId, newOrderCustomer._id);

    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
    await OrdersActions.clickOnDetailsActionButton(orderId);
  });

  after(async () => {
    await reqAsLoggedUser(ControllersList.orders.deleteOrder, { data: { _id: orderIdShared } });
    for (const product of [products]) {
      await reqAsLoggedUser(ControllersList.products.delete, { data: { _id: product } });
    }
    await reqAsLoggedUser(ControllersList.customers.delete, { data: { _id: customer } });
  });

  it('Should verify customer info in "Customer" section after order is created', async () => {
    const apiCustomer: ICustomer = (await ApiActions.customers.getCustomerByID(token, customer[0])).data.Customer;
    await OrdersAssertions.verifyCustomerInCustomerDetailsSection(apiCustomer);
  });

  it('Should change customer in order', async () => {
    await OrdersAssertions.verifyIsClickableButton(OrderDetailsPage.customerProductSection['Customer']['Edit customer pencil button'], true);

    console.log('newCustomer', newOrderCustomer.name);
    await OrderDetailsActions.customerProductSection.clickOnCustomerDetailsPencilButton();

    // await OrderDetailsActions.customerProductSection.basePage.waitForDropdownAndSelectValue(
    //   OrderDetailsPage.customerProductSection['Customer']['editCustomerModal'][
    //     'Customers dropdown'
    //   ],
    //   OrderDetailsPage.customerProductSection['Customer']['editCustomerModal'][
    //     'Customers dropdown options'
    //   ],
    //   newOrderCustomer.name,
    // );
    await OrderDetailsActions.customerProductSection.chooseDropdownItem(
      OrderDetailsPage.customerProductSection['Customer']['editCustomerModal']['Customers dropdown'],
      OrderDetailsPage['Dropdown option [last()]'](newOrderCustomer.name),
    );
    await utils.browserPause(3000);
    await OrderDetailsActions.customerProductSection.basePage.click(
      OrderDetailsPage.customerProductSection['Customer']['editCustomerModal']['Customer dropdown label in modal'],
    );
    await OrderDetailsActions.customerProductSection.editCustomerModal.clickOnSaveButton();

    await OrdersAssertions.verifyAndCloseToast(orderPageToastMessages.orderUpdated());
    await OrdersAssertions.verifyCustomerInCustomerDetailsSection(newOrderCustomer);
    const orderHistory = await OrderDetailsActions.tabsSection.getParsedAction(ORDER_HISTORY_ACTIONS.CUSTOMER_CHANGED);
    console.log('orderHistory', orderHistory);
    // Expect.toEqual({ actual: orderHistory.previous });
  });
});
