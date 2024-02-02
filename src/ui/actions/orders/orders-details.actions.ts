import { logAction } from '../../../utils/reporter/allure.reporter.js';
import BasePage from '../../pages/aqa_project/base.page.js';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page.js';
import Utils from '../../../utils/helpers.js';

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
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.customerSection['Edit customer pencil button']);
  }

  @logAction('Click on products pencil button')
  async clickOnProductsPencilbutton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.productsSection['Edit products pencil button']);
  }

  async clickOnDetailsOrderTab(tabName: 'delivery' | 'history' | 'comments') {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage['Details order tab title'](tabName));
  }

  async clickOnDeliveryTabInOrderDetails() {
    this.clickOnDetailsOrderTab('delivery');
  }
  async clickOnCommentsTabInOrderDetails() {
    this.clickOnDetailsOrderTab('comments');
  }
  async clickOnHistoryTabInOrderDetails() {
    this.clickOnDetailsOrderTab('history');
  }

  async clickOnAllAccordionButtonsInProductDetailsSection() {
    const buttons = await OrderDetailsPage.getArrayOfElements(OrderDetailsPage.productsSection['Accordion button']);
    for (let b of buttons) {
      b.click();
    }
    await Utils.browserPause(500);
  }

  async clickOnAccordionButtonWithNameInProductDetailsSection(productName: string) {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.productsSection['Accordion button with specified name'](productName));
  }
}

export default new OrdersDetailsActions();
