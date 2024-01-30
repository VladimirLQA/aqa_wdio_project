import OrdersController from '../../../api/controllers/orders.controller.js';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user.js';
import { logAction } from '../../../utils/reporter/allure.reporter.js';
import CreateOrderModalPage from '../../pages/aqa_project/modals/orders_modals/create-order.modal.page.js';
import OrdersPage from '../../pages/aqa_project/orders/orders.page.js';
import { IOrder, ORDER_STATUSES } from '../../types/order.types.js';
import { IProduct } from '../../types/products.types.js';
import { CommonActions } from '../common.actions.js';
import CreateOrderModalActions from '../modals/orders_modals/create-order.modal.actions.js';

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
    const order: IOrder = await this.getFilteredOrder(customerName, products);
    return order;
  }

  @logAction('Get created order table row')
  async getCreatedOrderRowInTable(orderId: string) {
    return {
      name: await OrdersPage.waitForElemAndGetText(OrdersPage['Name by table row'](orderId)),
      price: await OrdersPage.waitForElemAndGetText(OrdersPage['Price by table row'](orderId)),
      status: await OrdersPage.waitForElemAndGetText(OrdersPage['Status by table row'](orderId)),
      orderNumber: await OrdersPage.waitForElemAndGetText(OrdersPage['Order number by table row'](orderId)),
      delivery: await OrdersPage.waitForElemAndGetText(OrdersPage['Delivery by table row'](orderId)),
    };
  }

  async getFilteredOrder(customerName: string, products: string[]) {
    const order: IOrder = (await reqAsLoggedUser(OrdersController.getOrder, {})).data.Orders.find(
      (o: IOrder) =>
        o.customer.name === customerName &&
        o.products.filter((p: IProduct) => products.includes(p.name) && o.status === ORDER_STATUSES.DRAFT),
    );
    return order;
  }
}

export default new OrdersActions();
