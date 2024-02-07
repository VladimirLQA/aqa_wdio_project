import OrderDetailsPage from '../../pages/aqa_project/orders/order-details.page';
import BaseActions from '../base.actions';

class OrderTabsSectionActions extends BaseActions {
  async clickOnOrderTab(tabName: 'delivery' | 'history' | 'comments') {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.tabsSection['Common']['Order details section tab button'](tabName));
  }

  async clickOnDeliveryTab() {
    this.clickOnOrderTab('delivery');
  }
  async clickOnCommentsTab() {
    this.clickOnOrderTab('comments');
  }
  async clickOnHistoryTab() {
    this.clickOnOrderTab('history');
  }

  async fillCommentText(text: string) {
    await OrderDetailsPage.waitForElemAndSetValue(OrderDetailsPage.tabsSection['Comment']['Comments input text area'], text);
  }

  async cliclOnCreateCommentButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.tabsSection['Comment']['Create comment button']);
  }

  async cliclOnDeleteCommentButtonWithCommentText(commentSubstr: string) {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.tabsSection['Comment']['Delete comment button'](commentSubstr));
  }

  async clickOnScheduleEditDeliveryButton() {
    await OrderDetailsPage.waitForElemAndClick(OrderDetailsPage.tabsSection['Delivery']['Schedule delivery button']);
  }
}

export default new OrderTabsSectionActions();
