import { logAction } from '../../../utils/reporter/allure.reporter.js';
import { tabsSection } from '../../pages/aqa_project/orders/order-details-tabs-section.page.js';
import { IDelivery, LOCATION_TYPE, ORDER_HISTORY_ACTIONS } from '../../types/order.types.js';
import BaseActions from '../base.actions.js';

class OrderTabsSectionActions extends BaseActions {
  async clickOnOrderTab(tabName: 'delivery' | 'history' | 'comments') {
    await this.basePage.click(tabsSection['Common']['Order details section tab button'](tabName));
  }

  @logAction('Click on "Delivery" tab')
  async clickOnDeliveryTab() {
    await this.clickOnOrderTab('delivery');
  }

  @logAction('Click on "Comment" tab')
  async clickOnCommentsTab() {
    await this.clickOnOrderTab('comments');
  }

  @logAction('Click on "Order delivery" tab')
  async clickOnHistoryTab() {
    await this.clickOnOrderTab('history');
  }

  async fillCommentText(text: string) {
    await this.basePage.setValue(tabsSection['Comment']['Comments input text area'], text);
  }

  @logAction('Click on "Create" button in "Comment" tab')
  async clickOnCreateCommentButton() {
    await this.basePage.click(tabsSection['Comment']['Create comment button']);
  }

  @logAction('Add comment to order')
  async addComment(text: string) {
    await this.fillCommentText(text);
    await this.clickOnCreateCommentButton();
  }

  @logAction('Click on "Delete" comment button')
  async clickOnDeleteCommentButtonWithCommentText(commentSubstr: string) {
    await this.basePage.click(tabsSection['Comment']['Delete comment button'](commentSubstr));
  }

  @logAction('Click on "Schedule / Edit" delivery button')
  async clickOnScheduleEditDeliveryButton() {
    await this.basePage.click(tabsSection['Delivery']['Schedule delivery button']);
  }

  async getParsedAction(action: ORDER_HISTORY_ACTIONS) {
    const id = await this.getElementID(tabsSection['Order details']['Action id'](action));
    return (await this.basePage.browserExecute(`
        const result = {};
        const action = document.querySelector('${tabsSection['Order details']['Get action with id'](
          id,
        )}').innerText;
        const data  = [...document.querySelectorAll('${tabsSection['Order details'][
          'Action data by actioin id'
        ](id)}')].map(c => c.innerText).filter(v => v);
          const chunk = (arr, size) => {
              if (arr.length <= size) {
              return [arr];
              } else {
              return [arr.slice(0, size), ...chunk(arr.slice(size), size)];
            }
        };

        const chunkedData = chunk(data, 3);

        chunkedData.forEach(([property, previous, updated]) => {
          result[property.toLowerCase()] = {
            previous,
            updated
          };
        }); 
        return result;
    `)) as Promise<{}>;
  }
}

export default new OrderTabsSectionActions();
