import { logAction } from '../../../utils/reporter/allure.reporter';
import CreateOrderModalPage from '../../pages/aqa_project/modals/orders_modals/create-order.modal.page';
import OrdersPage from '../../pages/aqa_project/orders/orders.page';
import { CommonActions } from '../common.actions';
import CreateOrderModalActions from '../modals/orders_modals/create-order.modal.actions';

class OrdersActions extends CommonActions {
  @logAction('Click on details row button')
  async clickOnDetailsRowButton(orderNum: string, action: string) {
    await OrdersPage.waitForElemAndClick(OrdersPage['Table row action button'](orderNum, action));
  }

  @logAction('Click on "Create order" button')
  async clickOnCreateOrderButton() {
    await OrdersPage.waitForElemAndClick(OrdersPage['Create order button']);
  }

  @logAction('Create order')
  async createOrder(customerName: string, products: string[]) {
    await this.clickOnCreateOrderButton();
    await this.chooseDropdownItem(CreateOrderModalPage['Customer dropdown'], CreateOrderModalPage['Dropdown option'](customerName));
    await CreateOrderModalActions.addProductsToOrder(products);
    await CreateOrderModalActions.clickOnCreateButton();
  }

  @logAction('Get created order table row')
  async getCreatedProductRow(orderNum: string) {
    return {
      name: await OrdersPage.waitForElemAndGetText(OrdersPage['Name by table row'](orderNum)),
      price: await OrdersPage.waitForElemAndGetText(OrdersPage['Price by table row'](orderNum)),
      status: await OrdersPage.waitForElemAndGetText(OrdersPage['Status by table row'](orderNum)),
      number: await OrdersPage.waitForElemAndGetText(OrdersPage['Order number by table row'](orderNum)),
      delivery: await OrdersPage.waitForElemAndGetText(OrdersPage['Delivery by table row'](orderNum)),
    };
  }
}

export default new OrdersActions();
