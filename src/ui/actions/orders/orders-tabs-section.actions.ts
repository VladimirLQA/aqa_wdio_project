import { logAction } from '../../../utils/reporter/allure.reporter.js';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page.js';
import BaseActions from '../base.actions.js';

class OrderTabsSectionActions extends BaseActions {
  async clickOnOrderTab(tabName: 'delivery' | 'history' | 'comments') {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.tabsSection['Common']['Order details section tab button'](tabName));
  }

  @logAction('Click on "Delivery" tab')
  async clickOnDeliveryTab() {
    this.clickOnOrderTab('delivery');
  }

  @logAction('Click on "Comment" tab')
  async clickOnCommentsTab() {
    this.clickOnOrderTab('comments');
  }

  @logAction('Click on "Order delivery" tab')
  async clickOnHistoryTab() {
    this.clickOnOrderTab('history');
  }

  async fillCommentText(text: string) {
    await OrderDetailsPage.waitForElemAndSetValue(OrderDetailsPage.tabsSection['Comment']['Comments input text area'], text);
  }

  async clickOnCreateCommentButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.tabsSection['Comment']['Create comment button']);
  }

  @logAction('Add comment to order')
  async addComment(text: string) {
    await this.fillCommentText(text);
    await this.clickOnCreateCommentButton();
  }

  @logAction('Click on delete comment button')
  async cliclOnDeleteCommentButtonWithCommentText(commentSubstr: string) {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.tabsSection['Comment']['Delete comment button'](commentSubstr));
  }

  @logAction('Click on "Schedule / Edit" delivery button')
  async clickOnScheduleEditDeliveryButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.tabsSection['Delivery']['Schedule delivery button']);
  }
}

export default new OrderTabsSectionActions();
