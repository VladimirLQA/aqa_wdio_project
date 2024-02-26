import { logAction } from '../../../utils/reporter/allure.reporter.js';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page.js';
import Utils from '../../../utils/helpers.js';
import BaseActions from '../base.actions.js';
import CustomerProductsActions from './orders-cust-prod-sections.actions.js';
import OrdersTabsSectionActions from './orders-tabs-section.actions.js';
import DeliveryActions from './orders-delivery.actions.js';
import { CommonActions } from '../common.actions.js';

class OrdersDetailsActions extends CommonActions {
  readonly customerProductSection = CustomerProductsActions;
  readonly tabsSection = OrdersTabsSectionActions;
  readonly delivery = DeliveryActions;

  @logAction('Click on "Refresh Order" button')
  async clickOnRefreshOrderButton() {
    await OrderDetailsPage.click(OrderDetailsPage['Refresh order button']);
  }

  @logAction('Click on "Cancel Order" button')
  async clickOnCancelOrderButton() {
    await OrderDetailsPage.click(OrderDetailsPage['Cancel order button']);
  }

  @logAction('Click on "Process Order" button')
  async clickOnProcessOrderButton() {
    await OrderDetailsPage.click(OrderDetailsPage['Process order button']);
  }

  @logAction('Click on "Yes Process" button in "Process order" modal')
  async clickOnYesProcessButtonInProcessOrderModal() {
    await OrderDetailsPage.click(OrderDetailsPage['Confirm process modal button']);
  }

  @logAction('Click on "Cancel" button in "Process order" modal')
  async clickOnCancelButtonInProcessOrderModal() {
    await OrderDetailsPage.click(OrderDetailsPage['Cancel confirm process modal button']);
  }

  @logAction('Confirm process order')
  async confirmProcessOrder() {
    await this.clickOnProcessOrderButton();
    await this.clickOnYesProcessButtonInProcessOrderModal();
  }
}

export default new OrdersDetailsActions();
