import { logAction } from '../../../utils/reporter/allure.reporter.js';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page.js';
import Utils from '../../../utils/helpers.js';
import BaseActions from '../base.actions.js';
import CustomerProductsActions from './orders-cust-prod-sections.actions.js';
import OrdersTabsSectionActions from './orders-tabs-section.actions.js';
import DeliveryActions from './orders-delivery.actions.js';

class OrdersDetailsActions extends BaseActions {
  readonly customerProductSection = CustomerProductsActions;
  readonly tabsSection = OrdersTabsSectionActions;
  readonly delivery = DeliveryActions;

  @logAction('Click on refresh order button')
  async clickOnRefreshOrderButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Refresh order button']);
  }

  @logAction('Click on cancel order button')
  async clickOnCancelOrderButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Cancel order button']);
  }

  @logAction('Click on process order button')
  async clickOnProcessOrderButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Process order button']);
  }
}

export default new OrdersDetailsActions();
