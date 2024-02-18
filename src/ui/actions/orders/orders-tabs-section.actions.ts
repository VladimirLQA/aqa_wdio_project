import { logAction } from '../../../utils/reporter/allure.reporter.js';
import { tabsSection } from '../../pages/aqa_project/orders/order-details-tabs-section.page.js';
import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page.js';
import DeliveryPage from '../../pages/aqa_project/orders/orders-delivery.page.js';
import { IDelivery, LOCATION_TYPE } from '../../types/order.types.js';
import BaseActions from '../base.actions.js';

class OrderTabsSectionActions extends BaseActions {
  async clickOnOrderTab(tabName: 'delivery' | 'history' | 'comments') {
    await OrderDetailsPage.click(tabsSection['Common']['Order details section tab button'](tabName));
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
    await OrderDetailsPage.setValue(tabsSection['Comment']['Comments input text area'], text);
  }

  async clickOnCreateCommentButton() {
    await OrderDetailsPage.click(tabsSection['Comment']['Create comment button']);
  }

  @logAction('Add comment to order')
  async addComment(text: string) {
    await this.fillCommentText(text);
    await this.clickOnCreateCommentButton();
  }

  @logAction('Click on delete comment button')
  async cliclOnDeleteCommentButtonWithCommentText(commentSubstr: string) {
    await OrderDetailsPage.click(tabsSection['Comment']['Delete comment button'](commentSubstr));
  }

  @logAction('Click on "Schedule / Edit" delivery button')
  async clickOnScheduleEditDeliveryButton() {
    await OrderDetailsPage.click(tabsSection['Delivery']['Schedule delivery button']);
  }
}

export default new OrderTabsSectionActions();
