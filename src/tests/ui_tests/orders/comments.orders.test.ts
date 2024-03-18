import { orderPageToastMessages } from '../../../data/orders/orders.data';
import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import OrderDetailsActions from '../../../ui/actions/orders/orders-details.actions';
import ApiOrdersActions from '../../../api/api_actions/api-orders.actions';
import ApiSignInsActions from '../../../api/api_actions/api-sign-in.actions';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import OrdersActions from '../../../ui/actions/orders/orders.actions';

describe('Create order tests', () => {
  let token: string;

  before(async () => {
    token = await ApiSignInsActions.signInAsAdminAndGetToken();
    const { orderId, productsId, customerId } =
      await ApiOrdersActions.createOrderWithGeneratedProductsAndCustomer(token, 1);

    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openOrdersPage();
    await OrdersActions.clickOnDetailsActionButton(orderId);
  });

  after(async () => {});

  it('Should add comment', async () => {
    // input value
    // button is clickable
    // has 'is-valid' class
    // border color is green - #198754
    // verify toast
    // comment visible
    // verify value of the comment
    // button delete clickable
    // button color is red - #dc3545
  });
  it('Should delete comment', async () => {
    // verify toast
    // comment not visible
  });
  it('Validation checks', async () => {
    // todo create data to test validations
  });
  it('Should get an error after clicking on "Create" comment button with empty value', async () => {});
});
