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

  @logAction('Click on "Refresh Order" button')
  async clickOnRefreshOrderButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Refresh order button']);
  }

  @logAction('Click on "Cancel Order" button')
  async clickOnCancelOrderButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Cancel order button']);
  }

  @logAction('Click on "Process Order" button')
  async clickOnProcessOrderButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Process order button']);
  }

  @logAction('Click on "Yes Process" button in "Process order" modal')
  async clickOnYesProcessButtonInProcessOrderModal() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Confirm process modal button']);
  }

  @logAction('Click on "Cancel" button in "Process order" modal')
  async clickOnCancelButtonInProcessOrderModal() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Cancel confirm process modal button']);
  }

  @logAction('Confirm process order')
  async confirmProcessOrder() {
    await this.clickOnProcessOrderButton();
    await this.clickOnYesProcessButtonInProcessOrderModal();
  }
}

export default new OrdersDetailsActions();
