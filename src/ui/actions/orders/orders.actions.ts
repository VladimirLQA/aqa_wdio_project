import OrdersController from '../../../api/controllers/orders.controller.js';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user.js';
import { logAction } from '../../../utils/reporter/allure.reporter.js';
import CreateOrderModalPage from '../../pages/aqa_project/modals/orders_modals/create-order.modal.page.js';
import OrdersPage from '../../pages/aqa_project/orders/orders.page.js';
import { IOrder, ORDER_STATUSES } from '../../types/order.types.js';
import { IProduct } from '../../types/products.types.js';
import BaseActions from '../base.actions.js';
import { CommonActions } from '../common.actions.js';
import CreateOrderModalActions from '../modals/orders_modals/create-order.modal.actions.js';

class OrdersActions extends CommonActions {
  readonly createOrderModal = CreateOrderModalActions;

  @logAction('Click on "Create order" button')
  async clickOnCreateOrderButton() {
    await OrdersPage.click(OrdersPage['Create order button']);
  }

  @logAction('Create order')
  async createOrder(customerName: string, products: string[]) {
    await this.clickOnCreateOrderButton();
    await this.chooseDropdownItem(
      CreateOrderModalPage['Customer dropdown'],
      CreateOrderModalPage['Dropdown option [last()]'](customerName),
    );
    await this.createOrderModal.addProductsToOrder(products);
    await this.createOrderModal.clickOnCreateButton();
    const order: IOrder = await this.getOrder(customerName, products);
    return order;
  }

  @logAction('Get created order table row')
  async getCreatedOrderRowInTable(orderId: string) {
    return {
      name: await OrdersPage.getText(OrdersPage['Name by table row'](orderId)),
      price: await OrdersPage.getText(OrdersPage['Price by table row'](orderId)),
      status: await OrdersPage.getText(OrdersPage['Status by table row'](orderId)),
      orderNumber: await OrdersPage.getText(OrdersPage['Order number by table row'](orderId)),
      delivery: await OrdersPage.getText(OrdersPage['Delivery by table row'](orderId)),
    };
  }

  async getOrder(customerName: string, products: string[]) {
    const order: IOrder = (await reqAsLoggedUser(OrdersController.get, {})).data.Orders.find(
      (o: IOrder) =>
        o.customer.name === customerName &&
        o.products.filter((p: IProduct) => products.includes(p.name)),
    );
    return order;
  }
}

export default new OrdersActions();
