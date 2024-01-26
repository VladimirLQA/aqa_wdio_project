import { logAction } from '../../../utils/reporter/allure.reporter.js';
import BasePage from '../../pages/aqa_project/base.page.js';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page.js';

class OrdersDetailsActions extends BasePage {
  @logAction('Click on refresh order button')
  async clickOnRefreshOrderButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Refresh order button']);
  }

  @logAction('Click on cancel order button')
  async clickOnCancelOrderButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Cancel order button']);
  }

  @logAction('Click on customer details pencil button')
  async clickOnCustomerDetailsPencilbutton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Edit customer pencil button']);
  }

  @logAction('Click on products pencil button')
  async clickOnProductsPencilbutton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Edit products pencil button']);
  }

  @logAction('Click on order details tab')
  async clickOnDetailsOrderTab(tabName: 'delivery' | 'history' | 'comments') {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Details order tab title'](tabName));
  }
}

export default new OrdersDetailsActions();
