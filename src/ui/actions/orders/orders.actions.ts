import { CommonActions } from '../common.actions';
import OrdersPage from '../../pages/aqa_project/orders/orders.page';
import { logAction } from '../../../utils/reporter/allure.reporter';
import CreateOrderModalActions from '../modals/orders_modals/create-order.modal.actions';

class OrdersActions extends CommonActions {
  @logAction('Click on details row button')
  async clickOnDetailsRowButton(orderNum: string, action: string) {
    await this.basePage.waitForElemAndClick(OrdersPage['Table row action button'](orderNum, action));
  }

  @logAction('Click on "Create order" button')
  async clickOnCreateOrderButton() {
    await this.basePage.waitForElemAndClick(OrdersPage['Create order button']);
  }

  @logAction('Create order')
  async createOrder(customerName: string) {
    await this.clickOnCreateOrderButton(); 
    await CreateOrderModalActions.clickOnCustomerDropdown(); 
    await CreateOrderModalActions.clickOnCustomerFromDropdownList(customerName);
    await CreateOrderModalActions.clickOnAddProductButton(); 
    await CreateOrderModalActions.clickOnCreateButton(); 
  }

  @logAction('Get created order table row')
  async getCreatedProductRow(orderNum: string) {
    return {
      name: await OrdersPage.waitForElemAndGetText(OrdersPage['Name by table row'](orderNum)),
      price: await OrdersPage.waitForElemAndGetText(OrdersPage['Price by table row'](orderNum)),
      status: await OrdersPage.waitForElemAndGetText(OrdersPage['Status by table row'](orderNum)),
    };
  }
}

export default new OrdersActions();
