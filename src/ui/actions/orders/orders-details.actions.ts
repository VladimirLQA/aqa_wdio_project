import { logAction } from '../../../utils/reporter/allure.decorators.js';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page.js';
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
    await this.basePage.click(OrderDetailsPage['Refresh order button']);
  }

  @logAction('Click on "Cancel Order" button')
  async clickOnCancelOrderButton() {
    await this.basePage.click(OrderDetailsPage['Cancel order button']);
  }

  @logAction('Click on "Process Order" button')
  async clickOnProcessOrderButton() {
    await this.basePage.click(OrderDetailsPage['Process order button']);
  }

  @logAction('Click on "Yes Process" button in "Process order" modal')
  async clickOnYesButtonInProcessOrderModal() {
    await this.basePage.click(OrderDetailsPage['Yes modal button']);
  }

  @logAction('Confirm process order')
  async confirmProcessOrder() {
    await this.clickOnProcessOrderButton();
    await this.clickOnYesButtonInModal();
  }

  @logAction('Confirm cancel order')
  async confirmCancelOrder() {
    await this.clickOnCancelOrderButton();
    await this.clickOnYesButtonInModal();
  }
}

export default new OrdersDetailsActions();
